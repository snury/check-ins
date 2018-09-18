const Actions = [
  { id: 0, name: "Deactivate" },
  { id: 1, name: "Activate" },
  { id: 2, name: "Status" }
  ];

export const Monitoring = {
  serverToLocal: data => data.map(({
    id,
    name,
    status,
    total_views: totalViews,
    views_last_month: viewsLastMonth
  }) => {
    return {
      id,
      status,
      name,
      totalViews,
      viewsLastMonth,
      actions: Actions
    };
  })
};
