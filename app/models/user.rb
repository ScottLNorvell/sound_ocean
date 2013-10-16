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

	def self.from_omniauth(auth)
		puts "******************************** #{auth.credentials.token} *************************"
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

end
