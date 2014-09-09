class TextMessage

  def initialize one
    @content = one
    @to_number = "00447908693479"
    self
  end

  def client
    @client ||=Twilio::REST::Client.new(ENV["TWILIO_SID"], ENV["TWILIO_AUTH"])
  end

  def send
    client.account.sms.messages.create(
      body: @content,
      to: @to_number,
      from: ENV["TWILIO_NUM"]
      )
  end

end