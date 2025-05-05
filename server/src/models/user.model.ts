import { DataTypes, Model, Optional } from 'sequelize';
import bcrypt from 'bcryptjs';
import { sequelize } from '../config/db';

// 定義用戶屬性接口
export interface UserAttributes {
  id: string;
  username: string;
  email: string;
  password: string;
  points: number;
  role: 'user' | 'admin';
  lastLogin: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

// 創建時可選的屬性
export interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'points' | 'role' | 'lastLogin'> {}

// 實現用戶模型
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public username!: string;
  public email!: string;
  public password!: string;
  public points!: number;
  public role!: 'user' | 'admin';
  public lastLogin!: Date | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // 比較密碼方法
  public async comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
  }

  // 用於轉換為JSON時排除密碼
  public toJSON(): object {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
  }
}

// 初始化用戶模型
User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 30],
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 100],
        notEmpty: true,
      },
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      allowNull: false,
      defaultValue: 'user',
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: 'users',
    sequelize,
    hooks: {
      // 密碼加密鉤子
      beforeCreate: async (user: User) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      // 更新密碼時加密
      beforeUpdate: async (user: User) => {
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

// 導出User類，使其方法可以在其他地方使用
export default User; 