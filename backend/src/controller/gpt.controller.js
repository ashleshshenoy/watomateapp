const openai = require('openai');
const apiKey = process.env.OPEN_AI_KEY;
const client = new openai({apiKey: apiKey});

async function customize(req, res){
    const action = req.body.action;
    const sentence= req.body.sentence;

    try {
        const gptResponse = await client.chat.completions.create({
            messages: [
                { 
                    role: "user",
                    content: `Please improve the grammar and fix any errors in the sentence and make the sentense ${action}: "${sentence}"`
                }
            ],
            model: 'gpt-3.5-turbo',
        });
        const improvedSentence = gptResponse.choices[0].message.content;
        console.log(improvedSentence)
        res.status(200).json(improvedSentence)
    } catch (error) {
        console.error("Error occurred while improving grammar:", error);
        return null;
    }
};

async function generateImage(req, res) {
    const textPrompt = req.body.prompt; 
    const response = await client.images.generate({
        model: "dall-e-2",
        prompt:  `For the message "${textPrompt}" generate meaningful illustrations for marketing campaigns, generate relavent and english`,
        n: 1,
        size: "256x256",
    });
    image_url = response.data;
    console.log(image_url[0].url);
    res.status(200).send({url : image_url[0].url});     
}



module.exports = {
    customize,
    generateImage
}