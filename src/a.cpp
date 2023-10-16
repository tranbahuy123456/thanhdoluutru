#include<bits/stdc++.h>
#include<map>
using namespace std;
map<int,bool>visited(int n,map<int,bool>visit){
     return visit;
}
int main(){
     map<int,vector<int> >nums;
     map<int,bool>visit;
     int n ,x,y; cin>>n;
     for(int i = 0 ;i<n;i++ ){
          cin>>x>>y;
          nums[x].push_back(y);
          nums[y].push_back(x);
     }

     return 0;
}