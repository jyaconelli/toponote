export default {
  geofences: [{description: 'Home', externalId: 'user-home'}, {description: 'Office', externalId: 'user-office'}],
  notes: [
    {geofence: 'user-home', title: 'shopping', text: 'get peanut butter and stuff', id: '1'},
    {geofence: 'user-home', title: 'dining', text: ' lets eat food later', id: '2'},
    {geofence: 'user-office', title: 'jobs to do', text: 'get it all done!', id: '3'}
  ],
  userId: null,
}