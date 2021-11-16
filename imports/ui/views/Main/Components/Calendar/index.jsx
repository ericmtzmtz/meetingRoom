import * as React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import Paper from '@material-ui/core/Paper';
import { makeStyles, alpha, withStyles } from '@material-ui/core/styles';
import { green, orange, purple, pink,  } from '@material-ui/core/colors';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { useSnackbar } from 'notistack';
import {
  EditingState,
  GroupingState,
  IntegratedEditing,
  IntegratedGrouping,
  Resources,
  ViewState,
} from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  WeekView,
  Appointments,
  GroupingPanel,
  MonthView,
  ViewSwitcher,
  Toolbar,
  AppointmentTooltip,
  AppointmentForm,
  CurrentTimeIndicator,
} from '@devexpress/dx-react-scheduler-material-ui';

const currentDate = new Date();
const schedulerData = [
    // {
    //   title: 'Website Re-Design Plan',
    //   room_id: 1,
    //   startDate: new Date('2021-11-16T11:00'),
    //   endDate: new Date('2021-11-16T13:00'),
    //   id: 0,
    // }, 
    {
      title: 'Book Flights to San Fran for Sales Trip',
      room_id: 2,
      startDate: new Date('2021-11-16T09:00'),
      endDate: new Date('2021-11-16T11:00'),
      id: 1,
    }, {
      title: 'Install New Router in Dev Room',
      room_id: 3,
      startDate: new Date('2021-11-16T13:00'),
      endDate: new Date('2021-11-16T15:00'),
      id: 2,
    },
    {
      title: 'Install New Router in Dev Room',
      room_id: 4,
      startDate: new Date('2021-11-16T10:00'),
      endDate: new Date('2021-11-16T12:00'),
      id: 3,
    },
    // {
    //   title: 'Test',
    //   room_id: 1,
    //   startDate: new Date('2021-11-16T09:30'),
    //   endDate: new Date('2021-11-16T10:00'),
    //   id: 4,
    // },
    // {
    //   title: '3er reunion',
    //   room_id: 1,
    //   startDate: new Date('2021-11-16T14:30'),
    //   endDate: new Date('2021-11-16T16:00'),
    //   id: 5,
    // },
  ];

const room_data = [
    { text: 'Sala 1', id: 1, color: green },
    { text: 'Sala 2', id: 2, color: orange },
    { text: 'Sala 3', id: 3, color: purple },
    { text: 'Sala 4', id: 4, color: pink },
  ];

const findColorByGroupId = id => (room_data.find(item => item.id === id)).color;

const usePrioritySelectorItemStyles = makeStyles(({ palette, spacing }) => ({
  bullet: ({ color }) => ({
    backgroundColor: color ? color[400] : palette.divider,
    borderRadius: '50%',
    width: spacing(2),
    height: spacing(2),
    marginRight: spacing(2),
    display: 'inline-block',
  }),
  prioritySelectorItem: {
    display: 'flex',
    alignItems: 'center',
  },
  priorityText: {
    '@media (max-width: 500px)': {
      display: 'none',
    },
  },
  priorityShortText: {
    '@media (min-width: 500px)': {
      display: 'none',
    },
  },
}));

const useGroupingStyles = (group) => {
  const color = findColorByGroupId(group.id);
  return makeStyles(({ spacing }) => ({
    cell: {
      backgroundColor: alpha(color[400], 0.1),
      '&:hover': {
        backgroundColor: alpha(color[400], 0.15),
      },
      '&:focus': {
        backgroundColor: alpha(color[400], 0.2),
      },
    },
    headerCell: {
      backgroundColor: alpha(color[400], 0.1),
      '&:hover': {
        backgroundColor: alpha(color[400], 0.1),
      },
      '&:focus': {
        backgroundColor: alpha(color[400], 0.1),
      },
    },
    icon: {
      paddingLeft: spacing(1),
      verticalAlign: 'middle',
    },
  }))();
};

const styles = theme => ({
  flexibleSpace: {
    margin: '0 auto 0 0',
  },
  prioritySelector: {
    marginLeft: theme.spacing(2),
    minWidth: 140,
    '@media (max-width: 500px)': {
      minWidth: 0,
      fontSize: '0.75rem',
      marginLeft: theme.spacing(0.5),
    },
  },
});

export const Calendar = () => {
  const [data, setData] = React.useState(schedulerData);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  // const [users, setUsers] = React.useState([])
  const [priority, setPriority] = React.useState(0);
  const [resources, setResources] =React.useState([
    {
      fieldName: "room_id",
      title: "Salas",
      instances: room_data
    },
    // {
    //   fieldName: "users_id",
    //   title: "Usuarios",
    //   instances: []
    // }
  ])

  const PrioritySelectorItem = ({color, text: resourceTitle,}) => {
    const text = resourceTitle || 'Ver Todas las salas';
    const shortText = resourceTitle ? text.substring(0, 1) : 'Salas';
    const classes = usePrioritySelectorItemStyles({ color });

    return (
      <div className={classes.prioritySelectorItem}>
        <span className={classes.bullet} />
        <span className={classes.priorityText}>{text}</span>
        <span className={classes.priorityShortText}>{shortText}</span>
      </div>
    );
  };

  const PrioritySelector = withStyles(styles, { name: 'PrioritySelector' })(({
    classes, priority,
  }) => {
    const currentPriority = priority > 0 ? room_data[priority - 1] : {};
    return (
      <FormControl className={classes.prioritySelector}>
        <Select
          disableUnderline
          value={priority}
          onChange={(e) => {
            filterRooms(e.target.value);
          }}
          renderValue={() => (
            <PrioritySelectorItem text={currentPriority.text} color={currentPriority.color} />
          )}
        >
          <MenuItem value={0}>
            <PrioritySelectorItem />
          </MenuItem>
          {room_data.map(({ id, color, text }) => (
            <MenuItem value={id} key={id.toString()}>
              <PrioritySelectorItem color={color} text={text} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  });

  const FlexibleSpace = withStyles(styles, { name: 'FlexibleSpace' })(({
    classes, priorityChange, ...restProps
    }) => {
      // setResources([{
      //   fieldName: "room_id",
      //   title: "Priority",
      //   instances: filterTasks(schedulerData, priority)
      // }])
      return(
      <Toolbar.FlexibleSpace {...restProps} className={classes.flexibleSpace}>
        <PrioritySelector priority={priority} priorityChange={priorityChange} />
      </Toolbar.FlexibleSpace>
      )
  });

  const TimeTableCell = React.memo(({ groupingInfo, ...restProps }) => {
    // groupingInfo = room_data
    const classes = useGroupingStyles(groupingInfo[0]);
    return (
      <DayView.TimeTableCell
        className={classes.cell}
        groupingInfo={groupingInfo}
        {...restProps}
      />
    );
  });

  const DayScaleCell = React.memo(({ groupingInfo, ...restProps }) => {
    // groupingInfo = room_data
    // room_data.map(item => (
    //   console.log(item)
    // ))
    const classes = useGroupingStyles(groupingInfo[0]);
    return (
      <DayView.DayScaleCell
        className={classes.headerCell}
        groupingInfo={groupingInfo}
        {...restProps}
      />
    );
  });

  const GroupingPanelCell = React.memo(({ group, ...restProps }) => {
    // group = {id: 4, fieldName: 'room_id', text: 'Sala 4'}
    const classes = useGroupingStyles(group);
    // const Icon = getIconById(group.id);
    return (
      <GroupingPanel.Cell
        className={classes.headerCell}
        group={group}
        {...restProps}
      >
        {/* <Icon
          className={classes.icon}
        /> */}
      </GroupingPanel.Cell>
    );
  });

  const grouping = [{
    resourceName: 'room_id',
  }];

  const filterTasks = (items, priorityId) => {
    return(
      items.filter(task => (!priorityId || task.room_id === priorityId))
  )}

  const filterRooms = (changePriority) =>{
    setPriority(changePriority)
    setResources([{
      fieldName: "room_id",
      title: "Salas",
      instances: room_data.filter(room => (room.id === changePriority))
    }])
    if (changePriority === 0) {
      setResources([{
        fieldName: "room_id",
        title: "Salas",
        instances: room_data
      }])
    }
  }

  const filter_appointment = (room_id) => {
    // const data = []
    let room_appointment = data.filter(appointment=> appointment.room_id === room_id)
    // data.push()
    return room_appointment
  }

  const handle_Changes = ({added, changed, deleted}) => {
    if (added) {
      const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
      // checamos si el evento sobre pasa las 2 horas
      if(added["endDate"] - added["startDate"] > 7200000 || added["allDay"] === true){
        enqueueSnackbar(
          'Ocurrio un error No puedes agendar una sala por mas de 2 horas!'
          , {variant: 'error'})
        return null
      }

      // 1 filtramos los eventos de esa sala
      const eventos_room = filter_appointment(added["room_id"]);
      // 2 filtramos los eventos anteriores pero del dia de que quiero agendar
      const eventos_dia = eventos_room.filter(events => events.startDate.getDate() === added.startDate.getDate());
      // 3 si es mayor a 9 am podemos proceder
      const after_9am = added.startDate.getHours() >= 9;
      
      if (eventos_dia.length != 0) {
        // 4 por cada uno de los eventos obtenidos en el paso 2 checamos si 
        //   la hora de inicio del evento que quiero agendar es mayor la hora de inicio y termino del
        //   primer evento en el loop for o map 
        //   la hora de termino tiene que ser menor a la hora de incio del siguiente evento de lo
        //   contrario se empalmaran
        if (after_9am){ // Checamos si el evento es despues de las 9 am
          // configuramos algunas const para limpiar codigo
          const new_event_startHour = added.startDate;
          const new_event_endHour = added.endDate;
          // seteamos variables para devolver
          let inicio_antes = false;
          let inicio_despues = false;
          let termino_antes = false;
          let termino_despues = false;
          let insert = false;
          eventos_dia.map((evento) => { // Mapeamos los eventos del dia en esa sala
            const event_map_startHour = evento.startDate;
            const event_map_endHour = evento.endDate;
            inicio_antes = false;
            inicio_despues = false;
            termino_antes = false;
            termino_despues = false;

            if (new_event_startHour < event_map_startHour){
              inicio_antes = true
              inicio_despues = false
              console.log(`Inicia Antes que ${evento.title} - ${inicio_antes}`);
            } else if (new_event_startHour > event_map_startHour){
              inicio_despues = true
              console.log(`Inicia Despues que ${evento.title} - ${inicio_despues}`);
            } 

            if(new_event_endHour > event_map_startHour){
              termino_despues = true;
              insert = false
              console.log(`Termina Despues que ${evento.title} - ${termino_despues}`);
            } else if (new_event_endHour <= event_map_startHour){
              termino_antes = true;
              console.log(`Termina Antes que ${evento.title} - ${termino_antes}`);
            }
          })

          console.log(
            `Inicia antes ${inicio_antes} && 
            Despues ${inicio_despues} && 
            termina Antes ${termino_antes}
            termina Despues ${termino_despues}
            `);
          
          console.log(insert);
          if (!insert){
            console.log('Seteando evento');
            setData([...data, { id: startingAddedId, ...added }]); // configuro el evento.
          } else {
            enqueueSnackbar(
              'Ocurrio un error No se pudo programar!'
              , {variant: 'error'}
            )
          }
        }
      } else {
        console.log('Sin eventos agregando uno');
        setData([...data, { id: startingAddedId, ...added }]); // configuro el evento.
      }
    }
    if (changed) {
      setData(data.map(appointment => (
        changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment)));
    }
    if (deleted !== undefined) {
      setData(data.filter(appointment => appointment.id !== deleted));
    }
  }

  return (
    <Paper>
      <Scheduler
        data={filterTasks(data, priority)}
        locale="es-MX"
      >
        <ViewState
          currentDate={currentDate}
        />
        <EditingState
          onCommitChanges={handle_Changes}
        />
        <GroupingState
          grouping={grouping}
        />
        <DayView
          startDayHour={9}
          endDayHour={16}
          intervalCount={2}
          timeTableCellComponent={TimeTableCell}
          dayScaleCellComponent={DayScaleCell}
          name="DIA"
        />
        <WeekView
          startDayHour={9}
          endDayHour={16}
          excludedDays={[0, 6]}
          timeTableCellComponent={TimeTableCell}
          dayScaleCellComponent={DayScaleCell}
          name="SEMANA"
        />
        <MonthView
          name="MES"
        />
        <Appointments />
        <Resources
          data={resources}
          mainResourceName="room_id"
        />
        <IntegratedGrouping />
        <IntegratedEditing />
        <AppointmentTooltip
          showDeleteButton
          showOpenButton
          showCloseButton
        />
        <AppointmentForm />

        <Toolbar
          flexibleSpaceComponent={FlexibleSpace}
        />
        <CurrentTimeIndicator
          updateInterval={15000}
          shadePreviousAppointments={true}
          shadePreviousCells={true}
        />
        <ViewSwitcher/>
        <GroupingPanel
          cellComponent={GroupingPanelCell}
        />
      </Scheduler>
    </Paper>
  )
}


// const {u} = useTracker(() => {
//     const noData = {users: []};
//     if(!Meteor.user()){
//       return noData;
//     }

//     const handler = Meteor.subscribe('usersList');

//     if(!handler.ready()){
//       console.log('No ready');
//       return {...noData}
//     }

//     const data = Meteor.users.find({}).fetch();
//     const new_Data = []

//     for (let user = 0; user < data.length; user++) {
//       const element = data[user];
//       new_Data.push({
//         id: element["_id"],
//         text: element['profile']["name"],
//       })
//     }

//     setResources([
//       {
//         fieldName: "room_id",
//         title: "Salas",
//         instances: room_data
//       },
//       {
//         fieldName: "users_id",
//         title: "Usuarios",
//         instances: new_Data
//       }
//     ])
//     console.log(new_Data);
//     return new_Data
//   })