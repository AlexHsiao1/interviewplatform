import mongoose, { Document, Schema } from 'mongoose';
import slugify from 'slugify';

// 公司文檔接口
export interface ICompany extends Document {
  name: string;
  slug: string;
  logo?: string;
  industry: string;
  location: string;
  description?: string;
  website?: string;
  verified: boolean;
  interviewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

// 公司架構
const companySchema = new Schema<ICompany>(
  {
    name: {
      type: String,
      required: [true, '公司名稱是必填的'],
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    logo: {
      type: String,
    },
    industry: {
      type: String,
      required: [true, '行業是必填的'],
    },
    location: {
      type: String,
      required: [true, '地點是必填的'],
    },
    description: {
      type: String,
    },
    website: {
      type: String,
      validate: {
        validator: function (v: string) {
          // 簡單的URL驗證
          return !v || /^https?:\/\/\S+\.\S+/.test(v);
        },
        message: '請提供有效的網址',
      },
    },
    verified: {
      type: Boolean,
      default: false,
    },
    interviewCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// 索引配置
companySchema.index({ name: 1, location: 1 }, { unique: true });
companySchema.index({ industry: 1 });
companySchema.index({ name: 'text', description: 'text' });

// 創建slug的中間件
companySchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true });
  }
  next();
});

// 虛擬字段: 完整logo URL
companySchema.virtual('logoUrl').get(function () {
  if (this.logo && !this.logo.startsWith('http')) {
    return `${process.env.BASE_URL || 'http://localhost:5000'}/uploads/logos/${this.logo}`;
  }
  return this.logo || null;
});

// 創建並導出模型
const Company = mongoose.model<ICompany>('Company', companySchema);

export default Company; 