# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160409185638) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "books", force: :cascade do |t|
    t.string   "title"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.string   "description"
    t.integer  "user_id",                 null: false
    t.integer  "source_language_name_id"
    t.integer  "target_language_name_id"
  end

  add_index "books", ["user_id"], name: "index_books_on_user_id", using: :btree

  create_table "iso6933s", force: :cascade do |t|
    t.string   "code",       limit: 3
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
  end

  add_index "iso6933s", ["code"], name: "index_iso6933s_on_code", using: :btree

  create_table "language_names", force: :cascade do |t|
    t.string   "name"
    t.integer  "iso6933_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "language_names", ["iso6933_id"], name: "index_language_names_on_iso6933_id", using: :btree

  create_table "phrase_pairs", force: :cascade do |t|
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.text     "source_phrase", null: false
    t.text     "target_phrase", null: false
    t.integer  "book_id",       null: false
  end

  add_index "phrase_pairs", ["book_id"], name: "index_phrase_pairs_on_book_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  add_foreign_key "books", "users"
end
