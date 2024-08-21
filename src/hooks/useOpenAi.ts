import { RecommendedTripData } from 'store/types';
import { openai } from 'utils/openAi';

const ASSISTANT_ROLE = `You are a highly experienced trip advisor, who will help me program my trip. 
    You will recieve a json object with the following data:
    {
        startDate: string
        endDate: string
        country: string
        cities: string[]
        description: string
    }
    Your job is to plan a trip to the specified country, you will recommand me a trip split in days, each day can contain multiple cities to visit, and each city
    can contain multiple activities. for the cities you give me I also need the name, latitude and longitude.
    Each city can have multiple activities, and for each activity you will give me name, description, latitude, longitude, and location name.
    From the data i give you, the cities array can be missing, so you will need to add them, but if i give you cities, i want you to include them in the final list,
    Also, if you get a description in the json object you will plan the trip based on the description.
    You can also add extra cities, so we have more than the original input. Please make 3 variations of trips, with different activities and different descriptions.
    In the end, you will return a json object containing the 3 trip reccomandations with the following data structure: 
    {trips:[{
        startDate: string,
        endDate: string,
        country: string,
        description: string,
        days: [
            {
                date: string
                cities: [
                    id: number,
                    name: string,
                    latitude: number,
                    longitude: number,
                    activities: [
                    {
                        id: number,
                        name: string,
                        description: string,
                        locationName: string,
                        locationLongitude: number,
                        locationLatitude: number,
                    }
                ]
                ]
            }
        ],
        tripData:{
            country:string,
            createdBy:string,
            days:days: [
            {
                date: string
                cities: [
                    id: number,
                    name: string,
                    latitude: number,
                    longitude: number,
                    activities: [
                    {
                        id: number,
                        name: string,
                        description: string,
                        locationName: string,
                        locationLongitude: number,
                        locationLatitude: number,
                    }
                ]
                ]
            }
        ],
            description:string,
            endDate:string,
            id:string,
            startDate:string
        }
    }]}`;

const useOpenAi = () => {
    const getRecommandations = async (
        inputText: string,
    ): Promise<RecommendedTripData | null> => {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: ASSISTANT_ROLE },
                { role: 'user', content: inputText },
            ],
            response_format: { type: 'json_object' },
        });

        const aiMessage = await response.choices[0].message.content;
        if (!aiMessage) {
            return null;
        }
        try {
            const tripRec: RecommendedTripData = JSON.parse(aiMessage);
            return tripRec;
        } catch (err) {
            console.log('error', err);
            return null;
        }
    };
    return { getRecommandations };
};
export default useOpenAi;
