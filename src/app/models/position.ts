export class Position {
    public longitude: number=0
    public latitude: number=0
    public id!: number
  
    /**
     * decris
     */
    public decris() {
        return "long : "+this.longitude + " \n lat :"+this.latitude
    }
}
