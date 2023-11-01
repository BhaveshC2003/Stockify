import requests
from bs4 import BeautifulSoup
import re

def remove_extra_spaces(text):
  text = re.sub(r"\s+", " ", text)
  text = text.strip()
  return text

def structure_sentences(text):
  sentences = text.split(".")
  sentences = [sentence for sentence in sentences if sentence]
  text = ". ".join(sentences)
  return text

def remove_wikipedia(text):
  text = re.sub(r"\bWikipedia\b", "", text)
  return text

ticker = input("Enter a Stock Ticker: ")
exchange = input("Enter the Stock Exchange for that stock: ")

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36'}
url = 'https://www.google.com/finance/quote/' + ticker + ':' + exchange         #'https://www.google.com/finance/quote/RELIANCE:NSE'
url2 = 'https://finance.yahoo.com/quote/' + ticker + '?p=' + ticker + '&.tsrc=fin-srch'    #'https://finance.yahoo.com/quote/RELIANCE.NS?p=RELIANCE.NS&.tsrc=fin-srch'

r1 = requests.get(url)
soup1 = BeautifulSoup(r1.text, 'html.parser')

r2 = requests.get(url2)
soup2 = BeautifulSoup(r2.text, 'html.parser')

g_name = soup1.find('div', {'class': 'zzDege'}).text
g_price = soup1.find('div', {'class': 'YMlKec fxKbKc'}).text
g_percent_change = soup1.find('div', {'class': 'JwB6zf'}).text
g_companyinfo = soup1.find('div', {'class': 'bLLb2d'}).text
g_companyinfo = remove_extra_spaces(g_companyinfo)
g_companyinfo = structure_sentences(g_companyinfo)
g_companyinfo = remove_wikipedia(g_companyinfo)

print("\nHere are the details of {}:\n".format(g_name))
print('Current Value: {}\nPercentage Change: {}'.format(g_price,g_percent_change))
print('\nAbout {}:\n'.format(g_name),g_companyinfo,'\n')


y_data = {}
y_data['Ticker'] = ticker          #'RELIANCE.NS'
y_data['Previous Close'] = soup2.find("td", attrs={"class": "Ta(end) Fw(600) Lh(14px)", "data-test": "PREV_CLOSE-value"}).text
y_data['Open'] = soup2.find("td", attrs={"class": "Ta(end) Fw(600) Lh(14px)", "data-test": "OPEN-value"}).text
y_data['Market Cap'] = soup2.find("td", attrs={"class": "Ta(end) Fw(600) Lh(14px)", "data-test": "MARKET_CAP-value"}).text
y_data['PE Ratio'] = soup2.find("td", attrs={"class": "Ta(end) Fw(600) Lh(14px)", "data-test": "PE_RATIO-value"}).text
y_data['EPS'] = soup2.find("td", attrs={"class": "Ta(end) Fw(600) Lh(14px)", "data-test": "EPS_RATIO-value"}).text
y_data['Forward Dividend & Yield'] = soup2.find("td", attrs={"class": "Ta(end) Fw(600) Lh(14px)", "data-test": "DIVIDEND_AND_YIELD-value"}).text
print(y_data)