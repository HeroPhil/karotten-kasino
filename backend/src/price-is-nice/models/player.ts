export enum PlayerStatus {
    void,
    babo,
    guessing,
    guessTaken
}

export class Player {

    guessValue: number | undefined;
    guessDelta: number | undefined;
    points: number = 0;
    pointsDelta: number = 0;

    constructor(public id: string, public displayName: string) { }

    compareToSolution(solution: number) {

        this.guessDelta = Math.abs(this.guessValue! - solution); // TODO find better alternative
    }

    givePoints(points: number) {
        this.points += points;
        this.pointsDelta += points;
    }

    prepNextRound() {
        this.guessValue = undefined;
        this.guessDelta = 0;
        this.pointsDelta = 0;
    }

}