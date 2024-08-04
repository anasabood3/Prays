

/**************************************************
    author: Muhamed Muminović
    This code is a modified version of Muhamed Muminović Rep
    source:https://github.com/mmuminovic/react-native-qibla-compass
    license: MIT
****************************************************/





import * as Location from 'expo-location';
import { Magnetometer } from 'expo-sensors';
import {
    useState,
    useEffect,
    useCallback,
} from 'react';

export const useQiblaCompass = () => {
    const [subscription, setSubscription] = useState(null);
    const [magnetometer, setMagnetometer] = useState(0);
    const [qiblad, setQiblad] = useState(0);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const initCompass = useCallback(async () => {
        const isAvailable = await Magnetometer.isAvailableAsync();
        if (!isAvailable) {
            setError('Compass is not available on this device');
            setIsLoading(false);
            return;
        }
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setError('Location permission not granted');
            setIsLoading(false);
            return;
        }

        try {
            const location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;
            calculate(latitude, longitude);
        } finally {
            setIsLoading(false);
            subscribe();
        }
    }, []);

    useEffect(() => {
        initCompass();

        return () => {
            unsubscribe();
        };
    }, []);

    const subscribe = () => {
        Magnetometer.setUpdateInterval(100);
        setSubscription(
            Magnetometer.addListener((data) => {
                setMagnetometer(angle(data));
            })
        );
    };

    const unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    };

    const angle = (magnetometer) => {
        let angle = 0;
        if (magnetometer) {
            const { x, y } = magnetometer;
            if (Math.atan2(y, x) >= 0) {
                angle = Math.atan2(y, x) * (180 / Math.PI);
            } else {
                angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
            }
        }
        return Math.round(angle);
    };

    const direction = (degree) => {
        if (degree >= 22.5 && degree < 67.5) {
            return 'NE';
        } else if (degree >= 67.5 && degree < 112.5) {
            return 'E';
        } else if (degree >= 112.5 && degree < 157.5) {
            return 'SE';
        } else if (degree >= 157.5 && degree < 202.5) {
            return 'S';
        } else if (degree >= 202.5 && degree < 247.5) {
            return 'SW';
        } else if (degree >= 247.5 && degree < 292.5) {
            return 'W';
        } else if (degree >= 292.5 && degree < 337.5) {
            return 'NW';
        } else {
            return 'N';
        }
    };

    const degree = (magnetometer) => {
        return magnetometer - 90 >= 0 ? magnetometer - 90 : magnetometer + 271;
    };

    const calculate = (latitude, longitude) => {
        const PI = Math.PI;
        const latk = (21.4225 * PI) / 180.0;
        const longk = (39.8264 * PI) / 180.0;
        const phi = (latitude * PI) / 180.0;
        const lambda = (longitude * PI) / 180.0;
        const qiblad =
            (180.0 / PI) *
            Math.atan2(
                Math.sin(longk - lambda),
                Math.cos(phi) * Math.tan(latk) -
                Math.sin(phi) * Math.cos(longk - lambda)
            );
        setQiblad(qiblad);
    };

    const compassDirection = direction(degree(magnetometer));
    const compassDegree = degree(magnetometer);
    const compassRotate = 360 - degree(magnetometer);
    const kabaRotate = 360 - degree(magnetometer) + qiblad;

    return {
        qiblad,
        compassDirection,
        compassDegree,
        compassRotate,
        kabaRotate,
        error,
        isLoading,
        reinitCompass: initCompass,
    };
};

