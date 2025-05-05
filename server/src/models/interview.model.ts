import mongoose, { Document, Schema } from 'mongoose';
import slugify from 'slugify';

// 面試經驗文檔接口
export interface IInterview extends Document {
  title: string;
  slug: string;
  company: {
    id: string;
    name: string;
    logo?: string;
  };
  position: string;
  industry: string;
  location: string;
  date: Date;
  process: string;
  questions: string;
  experience: string;
  tips: string;
  rating: number;
  difficulty: number;
  result: 'offer' | 'rejected' | 'pending' | 'withdraw';
  isAnonymous: boolean;
  status: 'pending' | 'approved' | 'rejected';
  userId: string;
  username: string;
  reviewerId?: string;
  reviewFeedback?: string;
  viewCount: number;
  cost: number; // 查看該面試經驗需要的積分
  createdAt: Date;
  updatedAt: Date;
}

// 面試經驗架構
const interviewSchema = new Schema<IInterview>(
  {
    title: {
      type: String,
      required: [true, '面試標題是必填的'],
      trim: true,
      maxlength: [100, '標題不能超過100個字符'],
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    company: {
      id: {
        type: String,
        required: [true, '公司ID是必填的'],
      },
      name: {
        type: String,
        required: [true, '公司名稱是必填的'],
      },
      logo: {
        type: String,
      },
    },
    position: {
      type: String,
      required: [true, '職位是必填的'],
      trim: true,
    },
    industry: {
      type: String,
      required: [true, '行業是必填的'],
    },
    location: {
      type: String,
      required: [true, '地點是必填的'],
    },
    date: {
      type: Date,
      required: [true, '面試日期是必填的'],
    },
    process: {
      type: String,
      required: [true, '面試流程是必填的'],
      minlength: [50, '面試流程至少需要50個字符'],
    },
    questions: {
      type: String,
      required: [true, '面試問題是必填的'],
    },
    experience: {
      type: String,
      required: [true, '面試體驗是必填的'],
      minlength: [100, '面試體驗至少需要100個字符'],
    },
    tips: {
      type: String,
    },
    rating: {
      type: Number,
      required: [true, '評分是必填的'],
      min: [1, '評分最低為1'],
      max: [5, '評分最高為5'],
    },
    difficulty: {
      type: Number,
      required: [true, '難度是必填的'],
      min: [1, '難度最低為1'],
      max: [5, '難度最高為5'],
    },
    result: {
      type: String,
      required: [true, '面試結果是必填的'],
      enum: {
        values: ['offer', 'rejected', 'pending', 'withdraw'],
        message: '面試結果必須是: offer, rejected, pending, withdraw',
      },
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: 'pending',
      enum: {
        values: ['pending', 'approved', 'rejected'],
        message: '狀態必須是: pending, approved, rejected',
      },
    },
    userId: {
      type: String,
      required: [true, '用戶ID是必填的'],
    },
    username: {
      type: String,
      required: [true, '用戶名是必填的'],
    },
    reviewerId: {
      type: String,
    },
    reviewFeedback: {
      type: String,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    cost: {
      type: Number,
      default: 10, // 默認查看需要10積分
      min: [0, '積分不能為負數'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// 索引配置
interviewSchema.index({ company: 1, position: 1, date: -1 });
interviewSchema.index({ status: 1, createdAt: -1 });
interviewSchema.index({ userId: 1, createdAt: -1 });
interviewSchema.index({
  title: 'text',
  position: 'text',
  experience: 'text',
  questions: 'text',
  'company.name': 'text',
});

// 創建slug的中間件
interviewSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    const rand = Math.floor(Math.random() * 10000);
    this.slug = slugify(`${this.title}-${rand}`, { lower: true });
  }
  next();
});

// 輸出前處理匿名選項
interviewSchema.methods.toJSON = function () {
  const obj = this.toObject();
  // 如果是匿名，則隱藏用戶信息
  if (obj.isAnonymous) {
    obj.username = '匿名用戶';
    obj.userId = '';
  }
  return obj;
};

// 創建並導出模型
const Interview = mongoose.model<IInterview>('Interview', interviewSchema);

export default Interview; 