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

if __name__ == "__main__":
    driver = WebDriver()
    driver.get(APP_URL)

    enter_login_page(driver)
    

    driver.quit()