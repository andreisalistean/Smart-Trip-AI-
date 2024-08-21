import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

import { Text } from 'components/Text';
import { useTheme } from 'context/ThemeContext';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import useTranslate from 'translations/useTranslate';
import { Trip } from 'utils/types';

import { months, weekDays } from './CalendarData';
import createStyles from './style';

type Props = {
    Year: number;
    Month: number;
};

type SortedTrip = {
    name: string;
    description: string;
    city: string;
    year: number;
    month: number;
    day: number;
};

type props = {
    trips: Trip[];
};

const CustomCalendare = ({ trips }: props) => {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const t = useTranslate();
    const date = useMemo(() => {
        return new Date();
    }, []);
    let currentDayIndex: number = 0;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const userData = useSelector(
        (state: RootState) => state.userDataReducer.userData,
    );

    const [month, setMonth] = useState(date.getMonth());
    const [year, setYear] = useState(date.getFullYear());
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const today = date.getDate();
    const [selectedDay, setSelectedDay] = useState(today);
    const [sortedTripData, setSortedTripData] = useState<SortedTrip[]>();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [monthTripData, setMonthTripData] = useState<SortedTrip[][]>([]);
    const noActivityDay = useMemo(() => {
        return {
            id: 0,
            name: 'No activities for this day',
            description: 'Fell free to lay back and relax ',
            city: 'Home',
        };
    }, []);

    const getTrips = useCallback(async () => {
        const sortedArray: SortedTrip[] = [];
        trips?.map((trip) => {
            trip?.Days.map((day, index) => {
                day.Cities.map((city) => {
                    city.Activities.map((activity) => {
                        const d = new Date(trip.startDate);
                        const sYear = d.getFullYear();
                        const sMonth = d.getMonth();
                        const sDay = d.getDate();
                        sortedArray.push({
                            name: activity.name,
                            description: activity.description,
                            city: city.name,
                            year: sYear,
                            month: sMonth,
                            day: sDay + index,
                        });
                    });
                });
            });
        });
        sortedArray.sort((a, b) => {
            if (a.year !== b.year) {
                return a.year - b.year;
            }
            if (a.month !== b.month) {
                return a.month - b.month;
            }
            return a.day - b.day;
        });
        setSortedTripData(sortedArray);
    }, [trips]);
    useEffect(() => {
        getTrips();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const monthData: SortedTrip[][] = new Array(31)
            .fill(null)
            .map(() => []);
        sortedTripData?.forEach((activity) => {
            if (activity.year == year && activity.month == month + 1) {
                monthData[activity.day].push(activity);
            }
        });

        setMonthTripData(monthData);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [month, noActivityDay, year, sortedTripData]);

    const decrementMonth = useCallback(() => {
        if (month === 0) {
            setYear(year - 1);
            setMonth(11);
        } else setMonth(month - 1);
    }, [month, year]);
    const incrementMonth = useCallback(() => {
        if (month === 11) {
            setYear(year + 1);
            setMonth(0);
        } else setMonth(month + 1);
    }, [month, year]);

    const getNumberOfDaysInaMonth = useCallback(
        ({ Year, Month }: Props): number => {
            return new Date(Year, Month + 1, 0).getDate();
        },
        [],
    );

    const getDayOfTheWeek = useCallback(
        (Year: number, Month: number, Day: number): number => {
            return new Date(Year, Month, Day).getDay();
        },
        [],
    );

    const renderWeekDays = useCallback(() => {
        return (
            <>
                <View style={styles.styleWeekDays}>
                    {weekDays.map((item, index) => (
                        <Text key={index}>{t('calendar.' + item)[0]}</Text>
                    ))}
                </View>
            </>
        );
    }, [styles.styleWeekDays, t]);

    const styleView = (
        startMonth: number,
        endMonth: number,
        index: number,
        calendarDay: number,
    ) => {
        if (index >= startMonth && index < endMonth)
            if (calendarDay == selectedDay) return styles.viewSelectedDate;
            else return styles.viewDate;
        else return styles.viewOutsideData;
    };

    const styleNumber = (
        startMonth: number,
        endMonth: number,
        index: number,
        day: number,
        currentMonth: number,
    ) => {
        if (index >= startMonth && index < endMonth)
            if (currentDayIndex == index && month == currentMonth)
                if (day == selectedDay) return styles.selectedCurentDay;
                else return [styles.dateCurentNumber];
            else return styles.dateNumber;
        else return styles.dateOutsideNumber;
    };

    const renderCalendar = useCallback(() => {
        const daysInCalendar = [];
        let calendarRow = [];
        const finalCalendar = [];
        let lastMonth;
        let yearOfLastMonth;

        if (month === 0) {
            lastMonth = 11;
            yearOfLastMonth = year - 1;
        } else {
            lastMonth = month - 1;
            yearOfLastMonth = year;
        }

        const numberOfDaysLastMonth = getNumberOfDaysInaMonth({
            Year: yearOfLastMonth,
            Month: lastMonth,
        });
        const lastDayOfTheWeek = getDayOfTheWeek(
            yearOfLastMonth,
            lastMonth,
            numberOfDaysLastMonth,
        );

        if (lastDayOfTheWeek !== 6)
            for (
                let i = numberOfDaysLastMonth - lastDayOfTheWeek;
                i <= numberOfDaysLastMonth;
                i++
            )
                daysInCalendar.push(i);
        const firstDayOfMonthPosition = daysInCalendar.length;
        const startMonth = daysInCalendar.length;
        for (
            let i = 1;
            i <= getNumberOfDaysInaMonth({ Year: year, Month: month });
            i++
        ) {
            daysInCalendar.push(i);
            if (i == today)
                // eslint-disable-next-line react-hooks/exhaustive-deps
                currentDayIndex = daysInCalendar.length - 1;
        }

        const endMonth = daysInCalendar.length;
        const remainingDays = 42 - daysInCalendar.length;
        for (let i = 1; i <= remainingDays; i++) {
            daysInCalendar.push(i);
        }
        const currentMonth = date.getMonth();
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 7; j++) {
                calendarRow.push(
                    <>
                        <TouchableOpacity
                            key={i * 7 + j}
                            style={styleView(
                                startMonth,
                                endMonth,
                                i * 7 + j,
                                daysInCalendar[i * 7 + j],
                            )}
                            onPress={() => {
                                setSelectedDay(
                                    i * 7 + j - firstDayOfMonthPosition + 1,
                                );
                            }}
                        >
                            <Text
                                key={i * 7 + j}
                                style={styleNumber(
                                    startMonth,
                                    endMonth,
                                    i * 7 + j,
                                    daysInCalendar[i * 7 + j],
                                    currentMonth,
                                )}
                            >
                                {daysInCalendar[i * 7 + j]}
                            </Text>
                        </TouchableOpacity>
                    </>,
                );
            }
            finalCalendar.push(
                <View key={i * 5} style={styles.styleDays}>
                    {calendarRow}
                </View>,
            );
            calendarRow = [];
        }
        return <>{finalCalendar}</>;
    }, [month, selectedDay]);

    const renderItem = ({ item }: { item: SortedTrip }, index: number) => {
        return (
            <>
                <View style={styles.cardActivity} key={index}>
                    <Text style={styles.styleTitleList}>{item.name}</Text>
                    <View style={styles.viewDescription}>
                        <Text style={styles.titleDescription}>Description</Text>
                        <Text style={styles.textDescription}>
                            {item.description}
                        </Text>
                    </View>
                    <View style={styles.locationView}>
                        <Text style={styles.titleLocation}>Location</Text>
                        <Text style={styles.textLocation}>{item.city}</Text>
                    </View>
                </View>
            </>
        );
    };

    return (
        <>
            <View style={styles.container} key={1}>
                <View style={styles.styleYear}>
                    <Text>{year}</Text>
                </View>
                <View style={styles.styleTitle} key={2}>
                    <TouchableOpacity onPress={decrementMonth}>
                        <Image
                            source={require('../../assets/images/left-arrow.png')}
                            style={styles.styleImg}
                        />
                    </TouchableOpacity>

                    <Text>{t('calendar.' + months[month])}</Text>

                    <TouchableOpacity onPress={incrementMonth}>
                        <Image
                            source={require('../../assets/images/right-arrow.png')}
                            style={styles.styleImg}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.styleTitle}>{renderWeekDays()}</View>
                <View style={styles.styleColumn}>{renderCalendar()}</View>
                {monthTripData[selectedDay]?.map((item, index) =>
                    renderItem({ item }, index),
                )}
            </View>
        </>
    );
};

export default CustomCalendare;
