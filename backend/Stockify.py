#!/usr/bin/env python
# coding: utf-8

# In[ ]:


#!pip install chart_studio
from pandas_datareader import data, wb
import yfinance as yf
yf.pdr_override()
import pandas as pd
import numpy as np
import datetime as dt
import matplotlib.pyplot as plt
import chart_studio.plotly as py
import cufflinks as cf
import plotly.offline as pyo
import plotly.graph_objects as go
from plotly.subplots import make_subplots
import plotly.express as px
# pyo.init_notebook_mode(connected=True)
# pd.options.plotting.backend = 'plotly'
#%matplotlib inline


# In[ ]:


start = dt.datetime(2015,1,1)
end = dt.datetime(2023,11,12)
df = data.get_data_yahoo('AAPL',start,end)
print(df.head())

# In[ ]:



# In[ ]:


df2 = df.copy()


# In[ ]:


df2 = df2.reset_index()
df2 = df2.drop(['Adj Close'],axis=1)
df = df.drop(['Adj Close'],axis=1)
df2.head()


# In[ ]:


ma100 = df['Close'].rolling(100,min_periods=0).mean()
ma200 = df['Close'].rolling(200,min_periods=0).mean()


# In[ ]:

#Removing plots
# plt.figure(figsize=(12,6))
# plt.plot(df['Close'],label="Closing Price")
# plt.plot(ma100,'r',label="MA-100")
# plt.plot(ma200,'g',label="MA-200")
# plt.legend()


# In[ ]:

#Removing plot
# fig = px.line(y='Close',data_frame=df2)
# fig.add_scatter(y=ma100,name='100 Day Moving Avg')
# fig.add_scatter(y=ma200,name='200 Day Moving Avg')
# fig.update_layout()
# fig.show()


#Removing plot
# In[ ]:


# fig = make_subplots(rows=2, cols=1, shared_xaxes=True, 
#                vertical_spacing=0.10, subplot_titles=('CBA', 'Volume'), 
#                row_width=[0.2, 0.7])
# fig2 = go.Figure(
#     data=[
#         go.Candlestick(
#         x = df.index,
#         open = df["Open"], 
#         high = df["High"],
#         low = df["Low"], 
#         close = df["Close"]
#         )
#     ] 
# )
# fig2.update(layout_xaxis_rangeslider_visible=False)
# fig2.show()

# fig.add_trace(go.Candlestick(x=df.index, open=df["Open"], high=df["High"],
#                 low=df["Low"], close=df["Close"], name="OHLC"), 
#                 row=1, col=1)

# fig.add_trace(go.Bar(x=df.index, y=df['Volume'], marker_color='red', showlegend=False), row=2, col=1)

# fig.update_layout(
#     title='Historical price chart',
#     xaxis_tickfont_size=12,
#     yaxis=dict(
#         title='Price ($/share)',
#         titlefont_size=14,
#         tickfont_size=12,
#     ),
#     autosize=False,
#     width=800,
#     height=500,
#     margin=dict(l=50, r=50, b=100, t=100, pad=4),
#     paper_bgcolor='LightSteelBlue'
# )

# fig.update(layout_xaxis_rangeslider_visible=True)
# fig.show(renderer="colab")


# In[ ]:

#Removing plot
# fig3 = go.Figure(
#     data = [
#         go.Bar(
#             x=df.index, 
#             y=df['Volume'], 
#             marker_color='blue', 
#             showlegend=False,
#         )])
# fig3.show()


# In[ ]:


df.shape


# In[ ]:


X_train = pd.DataFrame(df['Close'][0 : int(len(df)*0.70)])
X_test = pd.DataFrame(df['Close'][int(len(df)*0.70) : int(len(df))])


# In[ ]:


print(X_train.shape)
print(X_test.shape)


# In[ ]:


X_train.head()   #Training data in order because time series


# In[ ]:


from sklearn.preprocessing import MinMaxScaler
scaler = MinMaxScaler(feature_range=(0,1))


# In[ ]:


data_training_array = scaler.fit_transform(X_train)
data_training_array


# In[ ]:


data_training_array.shape


# In[ ]:


x_train = []
y_train = []

for i in range(100 , data_training_array.shape[0]):
    x_train.append(data_training_array[i-100 : i])  #From 0 to 100
    y_train.append(data_training_array[i,0])        #Only one column

x_train , y_train = np.array(x_train) , np.array(y_train)

# In[ ]:


x_train.shape


# In[ ]:


from keras.layers import Dense,Dropout,LSTM
from keras.models import Sequential


# In[ ]:


#     model = Sequential()
#     model.add(LSTM(units=32, activation='relu', return_sequences=True, input_shape=(x_train.shape[1], 1)))
#     model.add(Dropout(0.2))

#     model.add(LSTM(units=64, activation='relu', return_sequences=True))
#     model.add(Dropout(0.3))

#     model.add(LSTM(units=100, activation='relu'))
#     model.add(Dropout(0.5))

#     model.add(Dense(units=1))

model = Sequential()
model.add(LSTM(units=32, activation='relu', return_sequences=True, input_shape=(x_train.shape[1], 1)))
model.add(Dropout(0.2))

model.add(LSTM(units=64, activation='relu'))
model.add(Dropout(0.5))

model.add(Dense(units=1))


# In[ ]:


#model.summary()


# In[ ]:


model.compile(optimizer='adam', loss='mean_squared_error')
model.fit(x_train, y_train, epochs=3)


# In[ ]:


# model.save('keras_model.h5')


# In[ ]:


#model.save('final_model.keras')


# In[ ]:


# from tensorflow.keras.models import load_model


# In[ ]:


# re_model = load_model('keras_model.h5')


# In[ ]:


# re_model.compile(optimizer='adam',loss='mean_squared_error')
# re_model.fit(x_train,y_train,epochs=50)


# In[ ]:


X_test.head()   # For predition we need previous 100 data rows thus we need to append


# In[ ]:


X_train.tail(100)


# In[ ]:


past_100_days = X_train.tail(100)


# In[ ]:


final_df = pd.concat([past_100_days,X_test],ignore_index=True)


# In[ ]:


final_df.head()


# In[ ]:


input_data = scaler.fit_transform(final_df)
input_data


# In[ ]:


input_data.shape


# In[ ]:


x_test = []
y_test = []

for i in range(100, input_data.shape[0]):
    x_test.append(input_data[i-100 : i])
    y_test.append(input_data[i , 0])


# In[ ]:


x_test , y_test = np.array(x_test) , np.array(y_test)


# In[ ]:


print(x_test.shape)
print(y_test.shape)


# In[ ]:


# Making predictions

predicted = model.predict(x_test)


# In[ ]:


predicted.shape


# In[ ]:


scaler.scale_


# In[ ]:


scale_factor = 1/(scaler.scale_[0])


# In[ ]:


predicted = predicted*scale_factor
y_test = y_test*scale_factor


# In[ ]:

#Removing plot
# plt.figure(figsize=(12,6))
# plt.plot(y_test,'b',label="Original Price")
# plt.plot(predicted,'r',label="Predicted Price")
# plt.xlabel("Time")
# plt.ylabel("Price")
# plt.legend()
# plt.show()


# In[ ]:

#Removing plot
# fig4 = px.line(y=y_test,data_frame=final)
# fig4.add_scatter(y=y_test,name='Original Price')
# fig4.add_scatter(y=predicted,name='Predicted Price')
# fig4.update_layout()
# fig4.show()


# In[ ]:


predicted.dtype
y_test.dtype


# In[ ]:


import numpy as np

def calculate_accuracy(y_test, predicted):
  # global mae,rmse,accuarcy
  # Calculate the mean absolute error (MAE) of the model.
  mae = np.mean(np.abs(y_test - predicted))

  # Calculate the root mean squared error (RMSE) of the model.
  rmse = np.sqrt(np.mean((y_test - predicted)**2))

  mape = (mae / y_test.mean()) * 100
  # Calculate the accuracy of the model.
  #accuracy = np.sum(y_test == predicted) / len(y_test)

  return mae, rmse, mape

# Calculate the accuracy of the model.

mae, rmse, mape = calculate_accuracy(y_test, predicted)

print("MAE: ", round(mae,3))
print("RMSE:", round(rmse,3))
print("MAPE:", round(mape,3),'%')


# In[ ]:


def predict_next_15_days(model, scaler, df):
    previous_100_days = df['Close'][-100:]
    next_15_days = [end + dt.timedelta(days=i) for i in range(1, 16)]
    new_df = pd.DataFrame({'Close': [np.nan] * 15}, index=next_15_days)
    df = pd.concat([df, new_df])
    last_115_days = pd.concat([previous_100_days, df['Close'][next_15_days]])
    x_test = np.array(last_115_days)
    x_test = x_test.reshape((x_test.shape[0],1,1))
    model.build(input_shape=(x_test.shape[0], 1,1))
    predictions = model.predict(x_test)
    scaler.inverse_transform(predictions)
    return predictions

print(predict_next_15_days(model, scaler, df))


# In[ ]:
import datetime as dt

# Create a function to predict stock closing prices for the next 15 days
# def predict_next_15_days(model, df):
#     # Get the previous 100 days of stock closing prices
#     previous_100_days = df['Close'][-100:]
#     # Reshape the previous 100 days of stock closing prices to match the input shape of the LSTM model
#     x_test = np.array(previous_100_days)
#     x_test = x_test.reshape((x_test.shape[0], 1,1))
#     print(x_test)
#     # Make predictions for the next 15 days of stock closing prices
#     predictions = model.predict(x_test)

#     return predictions

# # Get the current date
# today = dt.date(2023, 11, 6)

# # Create a Pandas DataFrame containing the stock closing prices for the previous 100 days
# df = pd.DataFrame({'Close': [np.nan] * 100}, index=pd.date_range(today - dt.timedelta(days=100), today - dt.timedelta(days=1)))

# # Predict the stock closing prices for the next 15 days
# next_15_days_closing_prices = predict_next_15_days(model, df)

# # Print the predicted stock closing prices for the next 15 days
# print("predictions",next_15_days_closing_prices)

