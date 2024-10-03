import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Pressable, StyleSheet, TouchableOpacity, } from 'react-native';
import { View } from "react-native";
import { current } from "@reduxjs/toolkit";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useEffect, useState } from "react";

interface CalendarDaysInterface {
  day: Date;
  changeCurrentDay: (date: CalendarItem) => void;
}



const areSameDay = (d1:Date, d2:Date):boolean=> {
  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
}


export interface CalendarItem {
  currentMonth: boolean;
  date: Date;
  month: number;
  year: number;
  number: number;
  selected: boolean;
  today: boolean
}


function CalendarDays(props: CalendarDaysInterface) {
  let firstDayOfMonth = new Date(props.day.getFullYear(), props.day.getMonth(), 1);
  // get week day (sun-sat) from the first day of the month
  let weekdayOfFirstDay = firstDayOfMonth.getDay();
  const currentDays: CalendarItem[] = [];
  // days of current month

  const color = useThemeColor({ light: 'black', dark: 'white' }, 'text');

  const renderDays = () => {
    for (let day: number = 0; day < 42; day++) {
      if (day === 0 && weekdayOfFirstDay === 0) {
        firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
      } else if (day === 0) {
        firstDayOfMonth.setDate(firstDayOfMonth.getDate() + (day - weekdayOfFirstDay));
      } else {
        firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
      }

      let calendarDay: CalendarItem = {
        currentMonth: (firstDayOfMonth.getMonth() === props.day.getMonth()),
        date: (new Date(firstDayOfMonth)),
        month: firstDayOfMonth.getMonth(),
        number: firstDayOfMonth.getDate(),
        selected: (firstDayOfMonth.toDateString() === props.day.toDateString()),
        today: areSameDay(firstDayOfMonth, new Date()),
        year: firstDayOfMonth.getFullYear()
      }
      currentDays.push(calendarDay);

    }
  }
  renderDays();

  return (
    <View id="table-content" style={styles.calenderTable}>
      {
        currentDays.map((day,index) => {
          return (
            <View key={index} style={{width:'14.20%'}}>
            <TouchableOpacity  onPress={() => { props.changeCurrentDay(day) }} style={[styles.calendarDay, day.selected ? styles.selected : {}, day.today ? { backgroundColor: 'green' } : {}]}>
              <ThemedText type="defaultSemiBold" style={{ fontSize: 20, color: day.currentMonth ? color : 'grey' }}>
                {day.number}</ThemedText>
            </TouchableOpacity>
            </View>
          )
        })
      }
    </View>
  )
}


const styles = StyleSheet.create({

    calenderTable:{
        display:'flex',
        justifyContent:'center',
        flexWrap:"wrap",
        flexDirection:'row',
        width:'100%',
    },


    calendarDay:{
        padding:8,
        margin:6,
        alignItems:'center',
        borderRadius:100,
    },

    
    selected:{
       backgroundColor:'grey'
    }

  });
  
  export default CalendarDays;