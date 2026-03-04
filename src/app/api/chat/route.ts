import { NextRequest } from "next/server";
import { streamText,convertToModelMessages } from 'ai'
import { createDeepSeek } from "@ai-sdk/deepseek";
const deepSeek = createDeepSeek({
    apiKey: 'sk-857fd71704804117b988987f15977bdb',
});
export async function POST(req: NextRequest) {
    const { messages } = await req.json(); //获取请求体
    //这里为什么接受messages 因为我们使用前端的useChat 他会自动注入这个参数，所有可以直接读取
    const result = streamText({
        model: deepSeek('deepseek-chat'), //使用deepseek-chat模型
        messages:await convertToModelMessages(messages), //转换为模型消息
        system: '你是一个资深段子手，擅长讲段子，请根据用户的问题给出回答', //系统提示词
    });
   
    return result.toUIMessageStreamResponse()
}
