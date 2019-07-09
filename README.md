# README

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index: true|
|e-mail|text|add_index:users, :name, unique:true|
|password|text or integer|null: false|

### Association
- has_many :messages
- has_many :groups, through: :members
- has_many :members

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|group|refernces|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Associstion
- has_many :messages
- has_many :users, through: :members
- has_many :members

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|
|image|string|
|group|references|null: false, foreign_key: true|
|user|references|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group
