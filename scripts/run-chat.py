from selenium.webdriver.chrome.webdriver import WebDriver

APP_URL = "http://localhost:3000"

if __name__ == "__main__":
    driver = WebDriver()
    
    driver.get(APP_URL)

    assert driver.title == "Raissa"

    driver.quit()