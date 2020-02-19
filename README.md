## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, foreign_key: true|
|email|string|null: false, foreign_key: true|
|password|integer|null: false, foreign_key: true|
|post_id|integer|null: false, foreign_key: true|


## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


## groupテーブル

|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false, foreign_key: true|


## postテーブル

|Column|Type|Options|
|------|----|-------|
|text|string|null: false, foreign_key: true|
|image|string|null: false, foreign_key: true|

