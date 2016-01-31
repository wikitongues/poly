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

ActiveRecord::Schema.define(version: 20160131000230) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "books", force: :cascade do |t|
    t.string   "title"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "description"
  end

  create_table "dictionaries", force: :cascade do |t|
    t.integer  "book_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "dictionaries", ["book_id"], name: "index_dictionaries_on_book_id", using: :btree

  create_table "source_phrases", force: :cascade do |t|
    t.integer  "dictionary_id"
    t.string   "text"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "source_phrases", ["dictionary_id"], name: "index_source_phrases_on_dictionary_id", using: :btree

  create_table "target_phrases", force: :cascade do |t|
    t.integer  "source_phrase_id"
    t.string   "text"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  add_index "target_phrases", ["source_phrase_id"], name: "index_target_phrases_on_source_phrase_id", using: :btree

  add_foreign_key "dictionaries", "books"
  add_foreign_key "source_phrases", "dictionaries"
  add_foreign_key "target_phrases", "source_phrases"
end
