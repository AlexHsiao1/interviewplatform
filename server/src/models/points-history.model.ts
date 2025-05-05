import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';
import User from './user.model';

// 定義積分歷史記錄屬性接口
export interface PointsHistoryAttributes {
  id: string;
  userId: string;
  amount: number;
  action: 'earned' | 'spent';
  description: string;
  relatedEntityId?: string;
  relatedEntityType?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// 創建時可選的屬性
export interface PointsHistoryCreationAttributes extends Optional<PointsHistoryAttributes, 'id' | 'relatedEntityId' | 'relatedEntityType'> {}

// 實現積分歷史記錄模型
export class PointsHistory extends Model<PointsHistoryAttributes, PointsHistoryCreationAttributes> implements PointsHistoryAttributes {
  public id!: string;
  public userId!: string;
  public amount!: number;
  public action!: 'earned' | 'spent';
  public description!: string;
  public relatedEntityId?: string;
  public relatedEntityType?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // 關聯
  public readonly user?: User;
}

// 初始化積分歷史記錄模型
PointsHistory.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1, // 至少1點
      },
    },
    action: {
      type: DataTypes.ENUM('earned', 'spent'),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    relatedEntityId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    relatedEntityType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'points_history',
    sequelize,
    hooks: {
      // 添加或扣除用戶積分的钩子
      afterCreate: async (record: PointsHistory) => {
        const user = await User.findByPk(record.userId);
        if (user) {
          // 根據動作增加或減少積分
          const pointsChange = record.action === 'earned' ? record.amount : -record.amount;
          // 更新用戶積分
          await user.update({ points: user.points + pointsChange });
        }
      },
    },
  }
);

// 定義關聯
PointsHistory.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

export default PointsHistory; 