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
    driver = WebDriver()
    driver.get(APP_URL)

    enter_login_page(driver)
    time.sleep(10)
    login_user(driver, "lucasb20", "123")
    time.sleep(10)
    send_in_chat(driver, "Hi guys")
    send_in_chat(driver, "How are you?")
    time.sleep(5)

    driver.quit()