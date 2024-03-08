from selenium.webdriver.chrome.webdriver import WebDriver
from selenium.webdriver.common.by import By

APP_URL = "http://localhost:3000"

def enter_login_page(driver : WebDriver):
    menu = driver.find_element(By.TAG_NAME, 'ul')
    buttons = menu.find_elements(By.TAG_NAME, 'li')

    for element in buttons:
        a = element.find_element(By.TAG_NAME, 'a')
        if a.text == "Login":
            a.click()
            break

def login_user(driver : WebDriver, username, password):
    driver.implicitly_wait(5)
    username_input = driver.find_element(By.ID, 'username')
    password_input = driver.find_element(By.ID, 'password')

    username_input.send_keys(username)
    password_input.send_keys(password)
    
    buttons = driver.find_elements(By.TAG_NAME, 'button')
    for button in buttons:
        if button.text == "Submit":
            button.click()
            break

if __name__ == "__main__":
    driver = WebDriver()
    driver.get(APP_URL)

    enter_login_page(driver)
    login_user(driver, "lucasb20", "123")

    driver.quit()