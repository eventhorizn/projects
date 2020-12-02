from splinter import Browser

executable_path = {
    'executable_path': 'C:\\Users\\gary.hake\\Desktop\\chromedriver_win32\\chromedriver.exe'}
    
hemisphere_info = []

with Browser(driver_name="chrome", **executable_path) as browser:
    url = 'https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars'
    browser.visit(url)
    
    link_containers = browser.links.find_by_partial_text("Hemisphere")
    links = []

    # This gets me the link object, but I want the url of each
    for lc in browser.links.find_by_partial_text("Hemisphere"):
        links.append(lc['href']) # Grabbing the href gets me the url

    #  Cycling through those links to get the title and pic url
    for link in links:
        browser.visit(link)
        title = browser.find_by_tag('h2').text.replace(" Enhanced", "") # It adds enhanced to the end, which is dumb
        pic_url = browser.links.find_by_partial_text('Original')['href']
        hemisphere_info.append({"title" : title, "img_url": pic_url})

print(hemisphere_info)