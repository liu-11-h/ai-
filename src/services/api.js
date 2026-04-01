import axios from 'axios';

const API_URL = 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions';
const API_KEY = import.meta.env.VITE_BAILIAN_API_KEY || 'sk-a4295fe157964fed960ae0737fa86cc1';

export async function sendMessage(message, model = 'qwen3.5-flash') {
  try {
    // 验证输入参数
    if (!message || typeof message !== 'string') {
      throw new Error('消息内容不能为空');
    }
    
    // 构建请求数据
    const requestData = {
      model: model,
      messages: [
        {
          role: 'user',
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    };
    
    const headers = {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    };
    
    // 发送请求
    const response = await axios.post(
      API_URL,
      requestData,
      {
        headers,
        timeout: 30000 // 设置30秒超时
      }
    );
    
    // 检查响应结构
    if (!response.data) {
      throw new Error('API 未返回数据');
    }
    
    if (!response.data.choices || response.data.choices.length === 0) {
      throw new Error('API 返回的数据结构不符合预期');
    }
    
    if (!response.data.choices[0].message || !response.data.choices[0].message.content) {
      throw new Error('API 未返回有效的回复内容');
    }
    
    // 从 choices[0].message.content 获取回复
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('API 调用失败:', error);
    
    // 处理不同类型的错误
    if (error.code === 'ECONNABORTED') {
      throw new Error('请求超时，请检查网络连接');
    }
    
    if (error.response) {
      // 服务器返回错误状态码
      const status = error.response.status;
      const data = error.response.data;
      
      if (status === 401) {
        throw new Error('API 密钥无效，请检查配置');
      }
      
      if (status === 403) {
        throw new Error('API 访问被拒绝，请检查权限');
      }
      
      if (status === 404) {
        throw new Error('API 端点不存在');
      }
      
      if (status === 429) {
        throw new Error('请求过于频繁，请稍后重试');
      }
      
      if (status >= 500) {
        throw new Error('服务器内部错误，请稍后重试');
      }
      
      // 其他错误
      if (data && data.error && data.error.message) {
        throw new Error(`API 错误: ${data.error.message}`);
      }
      
      throw new Error(`API 请求失败 (${status})`);
    } else if (error.request) {
      // 请求已发送但没有收到响应
      throw new Error('无法连接到 API 服务器，请检查网络连接');
    } else {
      // 其他错误
      throw new Error(`请求失败: ${error.message}`);
    }
  }
}