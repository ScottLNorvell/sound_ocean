class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :omniauthable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me, :score, :username, :sc_access_token

  has_many :discoveries, foreign_key: "discoverer_id", class_name: 'Song'
  has_many :playlists

  # validates_presence_of :email
  validates_uniqueness_of :username

  after_initialize :init

	def self.from_omniauth(auth)
		where(auth.slice(:provider, :uid)).first_or_create do |user|
			user.provider = auth.provider
			user.uid = auth.uid
			user.username = auth.info.nickname
			user.sc_access_token = auth.credentials.token
		end
	end

	def self.new_with_session(params, session)
		if session["devise.user_attributes"]
			new(session["devise.user_attributes"], without_protection: true) do |user|
				user.attributes = params
				user.valid?
			end
		else
			super
		end    
	end

	def email_required?
  		super && provider.blank?
	end

	def password_required?
  		super && provider.blank?
	end

	def update_with_password(params, *options)
	  if encrypted_password.blank?
	    update_attributes(params, *options)
	  else
	    super
	  end
	end

	def init
		self.score ||= 0
	end

end

# Auth Hash
#<OmniAuth::AuthHash credentials=#<OmniAuth::AuthHash expires=false token="1-55044-49384150-752cc24e4466dbd"> extra=#<OmniAuth::AuthHash raw_info=#<OmniAuth::AuthHash avatar_url="https://i1.sndcdn.com/avatars-000055067797-6q8msf-large.jpg?3eddc42" followers_count=1 followings_count=88 id=49384150 kind="user" online=false permalink="scoman613" permalink_url="http://soundcloud.com/scoman613" plan="Free" playlist_count=0 primary_email_confirmed=false private_playlists_count=0 private_tracks_count=0 public_favorites_count=0 quota=#<OmniAuth::AuthHash unlimited_upload_quota=false upload_seconds_left=7200 upload_seconds_used=0> track_count=0 upload_seconds_left=7200 uri="https://api.soundcloud.com/users/49384150" username="Scoman613">> info=#<OmniAuth::AuthHash::InfoHash image="https://i1.sndcdn.com/avatars-000055067797-6q8msf-large.jpg?3eddc42" nickname="Scoman613"> provider="soundcloud" uid=49384150>
