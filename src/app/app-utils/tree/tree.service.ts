import { TreeModel } from './tree.model';

export class TreeService {
    getData(): TreeModel[] {
    const item = [{
        id: 1,
            nodeName: 'Object-oriented programming',
            children: [
              {
                  id: 0,
                nodeName: 'Difficulty: Beginner',
                children: [{
                    id: 100,
                  nodeName: 'Which of language are OOP?',
                  children: [ 
                    {id: 1, nodeName: 'A. Java'},
                    {id: 2, nodeName: 'B. C++'},
                    {id: 3, nodeName: 'C. C#'},
                    {id: 4, nodeName: 'D. All of Above'}
                  ]
                }]
              }
            ]
          }];
    return JSON.parse(JSON.stringify(item));
    }
}