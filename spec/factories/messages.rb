FactoryBot.define do
  factory :message do
    content {Faker::Lorem.sentence}
    image {File.open("#{Rails.root}/public/images/UNADJUSTEDNONRAW_thumb_c07.jpg")}
    user
    group
  end
end