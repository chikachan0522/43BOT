// メッセージの構成要素（テキストや思考署名など）
export interface Part {
  text: string;
  thoughtSignature?: string; // 思考プロセスが含まれる場合に存在
}

// コンテンツ（役割とパーツ）
export interface Content {
  parts: Part[];
  role: string; // "model" | "user" など
}

// トークン使用量の詳細
export interface PromptTokensDetail {
  modality: string; // "TEXT" | "IMAGE" など
  tokenCount: number;
}

// メタデータ（トークン消費量など）
export interface UsageMetadata {
  promptTokenCount: number;
  candidatesTokenCount: number;
  totalTokenCount: number;
  thoughtsTokenCount?: number; // 思考モデルの場合に存在
  promptTokensDetails?: PromptTokensDetail[];
}

// 生成された回答候補
export interface Candidate {
  content: Content;
  finishReason: string; // "STOP" | "MAX_TOKENS" | "SAFETY" など
  index: number;
  // 安全性評価などが含まれる場合もありますが、提示されたJSONにはないため省略
}

// ルートとなるレスポンス型
export interface GeminiApiResponse {
  candidates: Candidate[];
  usageMetadata: UsageMetadata;
  modelVersion: string;
  responseId: string;
}
