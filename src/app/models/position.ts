export class Position {
    public longitude!: number
    public latitude!: number
    public id!: number
  
    /**
     * decris
     */
    public decris() {
        return "long : "+this.longitude + " \n lat :"+this.latitude
    }
}
