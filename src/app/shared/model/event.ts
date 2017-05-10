export class Event {
    id: string;
    date: string; //  20151017
    activity: string; //  activitya
    title: string; //  17-03 interesting seminar
    organization: string; //  Some org
    description: string; //  Some informations
    location: string; //  
    url: string; //  

    state: string = 'inactive';

    toggleState(): void {

        this.state = (this.state === 'active' ? 'inactive': 'active');

    }


    getLink(): string[] {

        return ['/calendar/', this.id];
    }

    test(): string {

        return '/calendar/' +  this.id;
    }

    coucou() {
      console.log(this.title);
    }
}
