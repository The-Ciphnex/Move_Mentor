async function getEstimatedArrivalTime(currentLocation, destination) {
    const response = await fetch('http://127.0.0.1:5000/predict_eta', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            current_location: currentLocation,  // e.g., "28.7041,77.1025"
            destination: destination,          // e.g., "28.5355,77.3910"
            traffic_level: 2,                  // 1 = light, 2 = moderate, 3 = heavy
            time_of_day: 9,                    // 9 AM
            weather: 1,                        // 1 = clear, 2 = rainy
            history_eta: 15                    // previous average ETA
        }),
    });

    const data = await response.json();
    console.log(`Predicted ETA: ${data.predicted_eta} minutes`);
}
