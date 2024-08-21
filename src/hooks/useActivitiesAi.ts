import { Activity } from 'store/types';
import { openai } from 'utils/openAi';

const ASSISTANT_ROLE =
    'You will recommend 15 activities from a country based on a subject .You will receieve the country and maybe the type of activities but this could be  optional.Give  recommendations  structured as follows:name and description strings,price as number,locationName,latitude,longitutde for the activity. Ensure the input and output are formatted in JSON format. Output should be just a JSON object between brackets. Cut /exclude/remove ```json from the response. Response should NOT be an array! The response should be formatted this way:Here is the JSON structure with all the quotes removed';

const inputText = 'Ney York,Clubbing';

const useActivitiesAi = () => {
    const getRecommandations = async () => {
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
            return;
        }
        try {
            const actRec: Activity = {
                ...JSON.parse(aiMessage),
                isComplete: false,
                image: '',
            };
            return actRec;
        } catch (err) {
            console.log('error', err);
        }
    };
    return getRecommandations;
};
export default useActivitiesAi;
