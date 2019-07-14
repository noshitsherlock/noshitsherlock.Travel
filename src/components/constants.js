const prod = {
    url: {
        API_URL_TRAVEL: "http://192.168.86.29:5000/api/travel",
        API_URL_TRAVEL_MULTIPLE: "http://192.168.86.29:5000/api/travelmultiplesiteid?",
        API_URL_SITUATION: "http://192.168.86.29:5000/api/situation"
    }
};

const dev = {
    url: {
        API_URL_TRAVEL: "http://localhost:5000/api/travel",
        API_URL_TRAVEL_MULTIPLE: "https://localhost:5001/api/travelmultiplesiteid?",
        API_URL_SITUATION: "http://localhost:5000/api/situation"
    }
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;