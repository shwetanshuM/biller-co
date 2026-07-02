const mongoose = require("mongoose")

const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId


const adminSchema = Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  business_name: { type: String, required: true },
  created_on: { type: Date, default: Date.now }
})

const memberSchema = Schema({
  owner_id: { type: ObjectId, ref: "admin", required: true },  // links member to a gym owner
  registration_number: { type: Number, unique: true, required: true },  // what owners type in messages eg "reg 1234"
  name: { type: String, required: true },
  phone: { type: String, unique: true },
  joining_date: { type: Date, default: Date.now },
  monthly_fee: { type: Number, required: true },
  status: { type: String, enum: ["active", "inactive"], default: "active" },  // enum so only valid values can be stored
  created_on: { type: Date, default: Date.now }
})

const paymentsSchema = Schema({
  member_id: { type: ObjectId, ref: "member", required: true },  // which member paid
  owner_id: { type: ObjectId, ref: "admin", required: true },    // which gym this belongs to — duplicated here so cross-member queries (cash collected today) don't need to go through members first
  amount: { type: Number, required: true },
  month: { type: String, required: true },  // store as "2026-07" not "July" — has year attached, sortable, unambiguous
  mode: { type: String, enum: ["cash", "upi"], required: true },
  paid_on: { type: Date, default: Date.now }
})

const adminModel = mongoose.model("admin", adminSchema)
const memberModel = mongoose.model("member", memberSchema)
const paymentsModel = mongoose.model("payments", paymentsSchema)

module.exports = { adminModel, memberModel, paymentsModel }