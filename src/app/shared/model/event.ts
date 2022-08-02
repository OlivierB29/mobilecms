export class Event {
    id: string ='';
    status: string ='';//draft, published
    date: string =''; //  20151017
    activity: string =''; //  activitya
    title: string =''; //  17-03 interesting seminar
    organization: string =''; //  Some org
    description: string =''; //  Some informations
    location: string =''; // location
    url: string =''; // url

    state = 'inactive';

    toggleState(): void {

        this.state = (this.state === 'active' ? 'inactive' : 'active');

    }


    getLink(): string[] {

        return ['/calendar/', this.id];
    }


}
