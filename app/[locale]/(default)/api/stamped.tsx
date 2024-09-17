import axios from 'axios';

export const fetchReviews = () => {
    const result = axios
        .get(`https://stamped.io/api/v2/105823/reviews`)
        .then(response => {
            console.log('Response status:', response.status);
            console.log('Response headers:', response.headers);
            console.log('Response data:', response.data);

            // Access specific data if you know the structure
            if (response.data && response.data.reviews) {
                console.log('Reviews:', response.data.reviews);
            } else {
                console.log('No reviews data found');
            }
        })
        .catch(error => {
            console.error('Error fetching reviews:', error.response ? error.response.data : error.message);
        });

    return result;
}