// packages
import ReactNotification from 'react-notifications-component'
import {notification} from '../notifications/notifications'
import { store } from 'react-notifications-component';
//hooks
import {useState, useEffect} from 'react';
// redux
import {useSelector, useDispatch} from 'react-redux';
import {addCity, deleteCity} from '../actions'
//components and styles
import {DaysDisplay} from '../components/daysDisplay'
import {MainWeatherDisplay} from '../components/MainWeatherDisplay'
import {CityLi} from '../components/CityLi'
import {SearchSvg} from '../components/SVG/searchSvg'
import 'react-notifications-component/dist/theme.css'
import {Input} from '../styledComponents/styles'
// helping functions
import {getWeather, getWeeklyWeather, getCity} from '../fetch/fetches'


export {ReactNotification, notification, store, useState, useEffect, useSelector, useDispatch, addCity, deleteCity, DaysDisplay, CityLi, SearchSvg, Input, getWeather, getWeeklyWeather, getCity,MainWeatherDisplay}