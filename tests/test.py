import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

app_url = 'http://localhost:8080'

class TestChat(unittest.TestCase):
    def setUp(self):
        options = self.get_default_chrome_options()
        self.driver = webdriver.Chrome(options=options)
        self.driver.get(app_url)

    def tearDown(self):
        self.driver.quit()

    def get_default_chrome_options(self):
        options = webdriver.ChromeOptions()
        options.add_argument('--headless')
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        return options

    def log_in_user(self, driver, username):
        username_input = driver.find_element(By.CSS_SELECTOR, 'form.card > input')
        username_input.send_keys(username)
        submit_button = driver.find_element(By.CSS_SELECTOR, 'form.card > button')
        submit_button.click()

    def send_message(self, driver, username):
        message_input = driver.find_element(By.CSS_SELECTOR, 'form#input-area > input')
        message_input.send_keys(username)
        send_button = driver.find_element(By.CSS_SELECTOR, 'form#input-area > button')
        send_button.click()

    def test_enter_page(self):
        main_title = self.driver.find_element(By.CSS_SELECTOR, 'header > h1')
        self.assertIn('Welcome to Chat-app', main_title.text)

    def test_log_in_user_with_valid_name(self):
        self.log_in_user(self.driver, 'Lucas')
        self.driver.implicitly_wait(2)
        join_message = self.driver.find_element(By.CSS_SELECTOR, '#messages > .system')
        self.assertIn("You joined", join_message.text)

    def test_log_in_user_with_invalid_name(self):
        options = self.get_default_chrome_options()
        another_driver = webdriver.Chrome(options=options)
        another_driver.get(app_url)

        username = 'Lucas'
        self.log_in_user(self.driver, username)
        self.driver.implicitly_wait(2)
        join_message = self.driver.find_element(By.CSS_SELECTOR, '#messages > .system')
        self.assertIn("You joined", join_message.text)

        self.log_in_user(another_driver, username)
        WebDriverWait(another_driver, 2).until(EC.alert_is_present())
        alert = another_driver.switch_to.alert
        self.assertIn("Connection closed or username already in use.", alert.text)
        alert.accept()
        another_driver.quit()

    def test_conversation(self):
        options = self.get_default_chrome_options()
        another_driver = webdriver.Chrome(options=options)
        another_driver.get(app_url)

        user1, user2 = 'Lucas', 'Livia'
        self.log_in_user(self.driver, user1)
        self.log_in_user(another_driver, user2)

        self.driver.implicitly_wait(2)
        self.driver.find_element(By.XPATH, f"//div[@id='messages']/div[text()='{user2} joined']")

        self.send_message(self.driver, f"Hello, {user2}! How's it going?")
        self.driver.implicitly_wait(2)
        sent_message = self.driver.find_element(By.CSS_SELECTOR, '#messages > .sent')
        another_driver.implicitly_wait(2)
        receive_message = another_driver.find_element(By.CSS_SELECTOR, '#messages > .received')
        self.assertEqual(sent_message.text.split('\n')[1], receive_message.text.split('\n')[1])

        self.send_message(another_driver, f"What's up, {user1}! Long time no see!")
        another_driver.implicitly_wait(2)
        sent_message = another_driver.find_element(By.CSS_SELECTOR, '#messages > .sent')
        self.driver.implicitly_wait(2)
        receive_message = self.driver.find_element(By.CSS_SELECTOR, '#messages > .received')
        self.assertEqual(sent_message.text.split('\n')[1], receive_message.text.split('\n')[1])
        another_driver.quit()

if __name__ == '__main__':
    unittest.main()
