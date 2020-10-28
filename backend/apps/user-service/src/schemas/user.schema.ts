import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { genderEnum } from '../enums/gender.enum';
import { rolesEnum } from '../enums/roles.enum';
import { statusEnum } from '../enums/status.enum';

export const UserSchema = new mongoose.Schema(
    {
        login: { type: String, required: true, index: true, unique: true },
        password: { type: String, required: true },
        email: { type: String, required: true, index: true, unique: true },
        firstName: { type: String, default: null },
        lastName: { type: String, default: null },
        gender: { type: String, enum: Object.values(genderEnum) },
        phone: { type: String, default: null },
        address: {
            country: { type: String, default: null },
            city: { type: String, default: null },
            addressLine1: { type: String, default: null },
            addressLine2: { type: String, default: null },
        },
        avatar: { type: String, default: null },
        avatarId: { type: String, default: null },
        status: {
            type: String,
            required: true,
            enum: Object.values(statusEnum),
            default: statusEnum.pending,
        },
        role: {
            type: String,
            required: true,
            enum: Object.values(rolesEnum),
            default: rolesEnum.user,
        },
    },
    { timestamps: true },
);

UserSchema.methods.verifyPassword = async function(password: string) {
    if (await bcrypt.compare(password, this.password)) {
        return {
            _id: this._id,
            login: this.login,
            status: this.status,
        };
    }
    return null;
};
