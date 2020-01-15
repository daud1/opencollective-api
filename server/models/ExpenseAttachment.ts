import { Model } from 'sequelize';
import restoreSequelizeAttributesOnClass from '../lib/restore-sequelize-attributes-on-class';

/**
 * Sequelize model to represent an ExpenseAttachment, linked to the `ExpenseAttachments` table.
 */
export class ExpenseAttachment extends Model<ExpenseAttachment> {
  public readonly id!: number;
  public ExpenseId!: number;
  public CreatedByUserId!: number;
  public amount!: number;
  public url!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt: Date;
  public incurredAt!: Date;
  public description: string;

  constructor(...args) {
    super(...args);
    restoreSequelizeAttributesOnClass(new.target, this);
  }
}

export default (sequelize, DataTypes): typeof ExpenseAttachment => {
  // Link the model to database fields
  ExpenseAttachment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
      incurredAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      ExpenseId: {
        type: DataTypes.INTEGER,
        references: { model: 'Expenses', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false,
      },
      CreatedByUserId: {
        type: DataTypes.INTEGER,
        references: { key: 'id', model: 'Users' },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        allowNull: false,
      },
    },
    {
      sequelize,
      paranoid: true,
      tableName: 'ExpenseAttachments',
    },
  );

  return ExpenseAttachment;
};
