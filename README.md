## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, foreign_key: true|
|email|string|null: false, foreign_key: true|
|password|integer|null: false|

### Association
has_many :groups,through: :groups_users
has_many :groups_users
has_many :posts


## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|reference|foreign_key: true|
|group_id|reference|foreign_key: true|

### Association
- belong_to :user
- belong_to :group


## groupテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, foreign_key: true|

### Association
has_many :users,through: :groups_users
has_many :groups_users
has_many :posts


## postテーブル

|Column|Type|Options|
|------|----|-------|
|text|string||
|image|string||
|user_id|reference|foreign_key: true|
|group_id|reference|foreign_key: true|

### Association
belong_to :user
belong_to :group