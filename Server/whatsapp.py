from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time

# ✅ Attach to existing Chrome session
chrome_options = webdriver.ChromeOptions()
chrome_options.debugger_address = "localhost:9222"

driver = webdriver.Chrome(options=chrome_options)

def send_whatsapp_message(phone_number, message):
    try:
        # ✅ Open WhatsApp Web using wa.me link
        driver.get(f"https://wa.me/{phone_number}")

        time.sleep(5)  # Let it load

        # ✅ Click on "Continue to Chat" button
        continue_button = driver.find_element(By.XPATH, '//a[contains(@href, "send?phone")]')
        continue_button.click()

        time.sleep(5)  # Let WhatsApp Web load

        # ✅ Find the message input box
        message_box = driver.find_element(By.XPATH, '//div[@title="Type a message"]')
        message_box.send_keys(message)
        message_box.send_keys(Keys.ENTER)

        print("Message sent successfully! ✅")

    except Exception as e:
        print("Error:", e)

# 🔥 Example Usage
send_whatsapp_message("919876543210", "Hello! This is an automated message.")
