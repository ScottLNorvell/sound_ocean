

FactoryGirl.define do
	# create user... Edit this!
	factory :user do
		sequence(:name) { |n| "Person #{n}" }
		sequence(:email) { |n| "person_#{n}@example.com"}

		password "foobar"
		password_confirmation "foobar"


	end

	
	factory :playlist do
		name "User's name!"
		user
	end
end