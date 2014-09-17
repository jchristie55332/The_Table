class ReservationsController < ApplicationController
  # GET /reservations
  # GET /reservations.json
  def index
    @reservations = []
    reservations = Reservation.all
    reservations.each do |r|
      if r.user_id == current_user.id
        @reservations << r
      end
    end
    @reservations_by_date = @reservations.group_by(&:date)
    @date = params[:date] ? Date.parse(params[:date]) : Date.today
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @reservations }
    end
  end

  def restaurant_reservations
    @restaurant = Restaurant.find(current_user.restaurant_id)
    @reservations = Reservation.where(restaurant_id: @restaurant.id)
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @reservations }
    end
  end

  # GET /reservations/1
  # GET /reservations/1.json
  def show
    @reservation = Reservation.find(params[:id])
    @user = User.find(@reservation.user_id)
    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @reservation }
    end
  end

  # GET /reservations/new
  # GET /reservations/new.json
  def new
    @reservation = Reservation.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @reservation }
    end
  end

  # GET /reservations/1/edit
  def edit
    @reservation = Reservation.find(params[:id])
  end

  # POST /reservations
  # POST /reservations.json
  def create
    @reservation = Reservation.new()
    @reservation.user_id = params[:user_id]
    @reservation.restaurant_id = params[:restaurant_id]
    @reservation.date = params[:date]
    @reservation.start_time = params[:start_time]
    @reservation.seats = params[:seats]
    restaurant = Restaurant.find(params[:restaurant_id])
    TextMessage.new(restaurant.name).send
    UserMailer.registration_confirmation(current_user, @reservation, restaurant).deliver
    respond_to do |format|
      if @reservation.save
        format.html { redirect_to reservations_path, notice: 'Reservation was successfully created.' }
        format.json { render json: @reservation, status: :created, location: @reservation }
      else
        format.html { render action: "new" }
        format.json { render json: @reservation.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /reservations/1
  # PUT /reservations/1.json
  def update
    @reservation = Reservation.find(params[:id])

    respond_to do |format|
      if @reservation.update_attributes(params[:reservation])
        format.html { redirect_to @reservation, notice: 'Reservation was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @reservation.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /reservations/1
  # DELETE /reservations/1.json
  def destroy
    # authorize! :destroy, @reservation

    @reservation = Reservation.find(params[:id])
    @reservation.destroy

    respond_to do |format|
      format.html { redirect_to restaurant_reservations_path }
      format.json { head :no_content }
    end
  end
end
