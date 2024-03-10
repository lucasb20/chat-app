from selenium.webdriver.chrome.webdriver import WebDriver
from selenium.webdriver.common.by import By
import time

APP_URL = "http://localhost:3000"

def enter_login_page(driver : WebDriver):
    menu = driver.find_element(By.TAG_NAME, 'ul')
    buttons = menu.find_elements(By.TAG_NAME, 'li')

    for element in buttons:
        a = element.find_element(By.TAG_NAME, 'a')
        if a.text == "Login":
            a.click()
            break

def enter_register_page(driver : WebDriver):
    menu = driver.find_element(By.TAG_NAME, 'ul')
    buttons = menu.find_elements(By.TAG_NAME, 'li')

    for element in buttons:
        a = element.find_element(By.TAG_NAME, 'a')
        if a.text == "Register":
            a.click()
            break

def login_user(driver : WebDriver, username, password):
    driver.find_element(By.ID, 'username').send_keys(username)
    driver.find_element(By.ID, 'password').send_keys(password)
    
    buttons = driver.find_elements(By.TAG_NAME, 'button')
    for button in buttons:
        if button.text == "Submit":
            button.click()
            break

def register_user(driver : WebDriver, username, password):
    driver.find_element(By.ID, 'username').send_keys(username)
    driver.find_element(By.ID, 'password1').send_keys(password)
    driver.find_element(By.ID, 'password2').send_keys(password)
    
    buttons = driver.find_elements(By.TAG_NAME, 'button')
    for button in buttons:
        if button.text == "Submit":
            button.click()
            break

def send_in_chat(driver : WebDriver, message):
    driver.find_element(By.ID, 'message-input').send_keys(message)
    driver.find_element(By.ID, 'send-button').click()

if __name__ == "__main__":
    driver1 = WebDriver()
    driver2 = WebDriver()

    driver1.get(APP_URL)
    driver1.maximize_window()
    driver1.save_screenshot("other/home_page.png")
    enter_login_page(driver1)

    driver2.get(APP_URL)
    driver2.maximize_window()
    enter_login_page(driver2)

    time.sleep(10)

    driver2.save_screenshot("other/login_page.png")
    
    login_user(driver1, "lucasb20", "123")
    login_user(driver2, "Livia", "123")
    
    time.sleep(10)

    send_in_chat(driver1, "Hey Livia, how's it going?")
    send_in_chat(driver2, "Hi Lucas! I'm doing well, thanks for asking. How about you?")
    send_in_chat(driver1, "I'm good, just chilling at home. Hey, did you catch the new episode of that show we were talking about?")
    send_in_chat(driver2, "Oh yeah, I watched it last night! It was intense, wasn't it?")

    time.sleep(5)

    driver1.save_screenshot("other/lucas_vision.png")
    driver2.save_screenshot("other/livia_vision.png")

    driver1.quit()
    driver2.quit()