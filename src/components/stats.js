import React, {Component} from "react";
import ChartUsers from "./reusable/chartUsers";
import ChartProduct from "./reusable/chartProduct";
import ChartPrediction from "./reusable/chartPrediction";
import ChartPositions from "./reusable/chartPositions";
import StackedChart from "./reusable/stackedChart";
import ChartTotals from "./reusable/chartTotals";
import CountUp from 'react-countup';
import XLSX from 'xlsx';
import Dropdown from "react-dropdown";
import Table from '@trendmicro/react-table';
import { TablePagination } from '@trendmicro/react-paginations';
import { HashLink as Link } from 'react-router-hash-link';
import Calendar from "./calendar";
// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-table/dist/react-table.css';
import '@trendmicro/react-paginations/dist/react-paginations.css';
import * as firebase from 'firebase';
import ClipLoader from 'react-spinners/ClipLoader';

class Stats extends Component{

  constructor(props){
    super(props);
    this.state = {
        ingresosbyMonth: [], egresosByMonth: [], totalEgresos: 0, totalIngresos: 0, month: "",
        egresoQro: [[]], egresoCLN: [[]], egresoMochis: [[]], stopsByClient:[], payByClient: [],
        totalRec: 0, totalRecFail: 0, descargas: 0, incidentes: 0, year: 0, byGroup: [], ingersos: [], loading: true, 
        monthSelected: null, yearSelected: null;
    }

    if(!firebase.apps.length){
      const firebaseConfig = {
        apiKey: "AIzaSyD3G-zK6USRWEAJy1_dtHdqZZb_GWDmifw",
        authDomain: "serecsin-1533314943191.firebaseapp.com",
        databaseURL: "https://serecsin-1533314943191.firebaseio.com",
        projectId: "serecsin-1533314943191",
        storageBucket: "",
        messagingSenderId: "1091946178343",
        appId: "1:1091946178343:web:68af7c6bb70c4584acab02"
      };

      this.dataBase = firebase.initializeApp(firebaseConfig);
    }

  }

  componentWillMount(){

    setTimeout(() => {this.setState({loading: false})}, 7500)

    return this.getData()
  }

  fetchData(){
    console.log("changed");
  }

  getData(){
    const db = firebase.firestore()

    var today = new Date();
    var dd = today.getDate();
    var mm = 1

    var year = new Date().getFullYear();
    // Clientes ganados y perdidos

    // let ingRef = db.collection('clientesGanados').where('año', '==', year).where("mes", "==", mm).get()
    //   .then(snapshot => {
    //     snapshot.forEach(doc => {
    //       arrayI.push(doc.data());
    //     })
    //   }

    // let ingRef = db.collection('clientesGanados').where('año', '==', year).where("mes", "==", mm).get()
    //   .then(snapshot => {
    //     snapshot.forEach(doc => {
    //       arrayI.push(doc.data());
    //     })
    //   }

    //Total ingrso por mes
    const arrayI = []
    let ingRef = db.collection('Ingresos').where('año', '==', year).orderBy("mes").get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          arrayI.push(doc.data());

          let counts = arrayI.reduce((prev, curr) => {
                let count = prev.get(curr.mes) || 0;
                prev.set(curr.mes, curr.importe + count);
                return prev;
              }, new Map());

              // then, map your counts object back to an array
              let reducedObjArr = [...counts].map(([key, value]) => {
                return {key, value}
              })
              this.setState({ingresosbyMonth: reducedObjArr});
        });
      })

    this.setState({ingresos: arrayI});

    const arrayE = []
    let egreRef = db.collection('egreso').where('año', '==', year).orderBy("mes").get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          arrayE.push(doc.data());

          let counts = arrayE.reduce((prev, curr) => {
                let count = prev.get(curr.mes) || 0;
                prev.set(curr.mes, curr.importe + count);
                return prev;
              }, new Map());

              // then, map your counts object back to an array
              let reducedObjArr = [...counts].map(([key, value]) => {
                return {key, value}
              })

              this.setState({egresosByMonth: reducedObjArr});
        });
      })



    //TOTAL INGRESO
    const arrayIngresos = []
    let ingresosRef = db.collection('Ingresos').where('mes', '==', mm).where('año', '==', year).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
          arrayIngresos.push(doc.data().importe); 

          this.setState({totalIngresos: arrayIngresos.reduce((a, b) => a + b, 0)})
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });


    //TOTAL EGRESO
    const arrayEgresos = []
    let egresosRef = db.collection('egreso').where('mes', '==', mm).where('año', '==', year).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
          arrayEgresos.push(doc.data().importe); 

          this.setState({totalEgresos: arrayEgresos.reduce((a, b) => a + b, 0)})
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });

      // Ingreso por recolección
      const porRe = []
      let porRecoleccion = db.collection('Ingresos').where('mes', '==', mm).where('año', '==', year).get()
       .then(snapshot => {
        snapshot.forEach(doc => {
           porRe.push(doc.data());

              let counts = porRe.reduce((prev, curr) => {
                let count = prev.get(curr.cliente) || 0;
                prev.set(curr.cliente, curr.importe + count);
                return prev;
              }, new Map());

              // then, map your counts object back to an array
              let reducedObjArr = [...counts].map(([key, value]) => {
                return {key, value}
              })

              this.setState({byGroup: reducedObjArr});
        });
      })


      //EGRESO QRO
      const egQro = []
      let egresosQro = db.collection('egreso').where('mes', '==', mm).where('año', '==', year).where("lugar", "==", "QUERETARO").get()
       .then(snapshot => {
        snapshot.forEach(doc => {
           egQro.push(doc.data());

              let counts = egQro.reduce((prev, curr) => {
                let count = prev.get(curr.genero) || 0;
                prev.set(curr.genero, curr.importe + count);
                return prev;
              }, new Map());

              // then, map your counts object back to an array
              let reducedObjArr = [...counts].map(([key, value]) => {
                return {key, value}
              })

              this.setState({egresoQro: reducedObjArr});
        });
      })
      // EGRESOS MOCHIS
      const egMochis = [];
      let egresosMochis = db.collection('egreso').where('mes', '==', mm).where('año', '==', year).where("lugar", "==", "MOCHIS").get()
       .then(snapshot => {
        snapshot.forEach(doc => {
           egMochis.push(doc.data());

              let counts = egMochis.reduce((prev, curr) => {
                let count = prev.get(curr.genero) || 0;
                prev.set(curr.genero, curr.importe + count);
                return prev;
              }, new Map());

              // then, map your counts object back to an array
              let reducedObjArr = [...counts].map(([key, value]) => {
                return {key, value}
              })

              console.log(reducedObjArr);

              this.setState({egresoMochis: reducedObjArr});
        });
      });

      //EGRESOS CULIACAN
      const egCuliacan = [];
      let egresosCuliacan = db.collection('egreso').where('mes', '==', mm).where('año', '==', year).where("lugar", "==", "CULIACAN").get()
       .then(snapshot => {
        snapshot.forEach(doc => {
           egCuliacan.push(doc.data());
              let counts = egCuliacan.reduce((prev, curr) => {
                let count = prev.get(curr.genero) || 0;
                prev.set(curr.genero, curr.importe + count);
                return prev;
              }, new Map());

              // then, map your counts object back to an array
              let reducedObjArr = [...counts].map(([key, value]) => {
                return {key, value}
              })

              this.setState({egresoCLN: reducedObjArr});
          });
      });

  }

  adeudos(){
    return this.state.ingresos.map(x => {
      return(
          <div className = "user-info">
              <p className = "one"> {x.cliente}</p>
              <p className = "two">$ {x.importe}</p>
              <p className = {"three " + (x.adeudoMes > 0 ? 'negative-monthly' : 'positive')}>$ {x.adeudoMes}</p>
              <p className = {"four " + (x.adeudoMes > 0 ? 'negative-yearly' : 'positive')}>$ {x.adeudoAño}</p>
          </div>
      );
    })
  }

  onChange(item){
    this.setState({userSelected: item})
  }

  render(){
    const {incidentes, descargas, totalRec, totalRecFail, totalIngresos, totalEgresos} = this.state;
    console.log(this.state.ingresos);

    const utilidadNeta = totalIngresos - totalEgresos || 0;
    const roi = (totalIngresos / totalEgresos) || 0;

    const puntoEquilibrio = (totalIngresos / 30) / totalEgresos || 0;

    const months = [ {mes: "Enero", key: 1}, {mes: "Febrero", key: 2}, {mes: "Marzo", key: 3}, {mes: "Abril", key: 4}, {mes: "Mayo", key: 5}, {mes: "Junio", key: 6}, {mes: "Julio", key: 7}, {mes: "Agosto", key: 8}, {mes: "Septiembre", key: 9}, {mes: "Octubre", key: 10}, {mes: "Noviembre", key: 11}, {mes: "Diciembre", key: 12}];

    const years = [2019, 2020];

    const options = [
        { value: "Culiacan", label: "Culiacan" },
        { value: "Mochis", label: "Mochis" },
        { value: "Queretaro", label: "Queretaro" }
    ];

    const columns = [
        { dataIndex: 'clientesGanados', title: "Clientes Ganados" },
        { dataIndex: 'clientesPerdidos', title: 'Clientes Perdidos' },
        { dataIndex: 'pedidosWeb', title: 'Pedidos web' },
    ];

    const data = [
            { id: 1, clientesGanados: 'Sushi Factory', clientesPerdidos: 'Oxxo la lomita', pedidosWeb: 5},
            { id: 2, clientesGanados: "Lomita x"},
            { id: 3, clientesGanados: 'Quisco'}
    ]

    const columnRecolección = [
        { dataIndex: 'cliente', title: "Clientes" },
        { dataIndex: 'diasRecolección', title: 'Días de recolección' },
    ];

    const dataRecolección = this.state.stopsByClient.map((x, index) => {
        return {id: index + 1  , cliente: x.client, diasRecolección: x.client__count}
    })

    const columnIndicadores = [
        { dataIndex: 'indicadores', title: "Indicadores" },
        { dataIndex: 'number', title: '#' },
    ];
    
    const dataIndicadores = [
            { id: 1, indicadores: 'Incidentes', number: incidentes},
            { id: 2, indicadores: 'Recolecciones totales', number: totalRec},
            { id: 3, indicadores: "Recolecciones fallidas", number: totalRecFail},
            { id: 4, indicadores: 'Descargas', number: descargas},
            { id: 5, indicadores: 'Recorrido mensual', number: "6597 KM"}

    ];

    return(
      <div className ="page-box">

      { this.state.loading ? 
        <div className = "spinner">
          <ClipLoader
            sizeUnit={"px"}
            size={250}
            color={'black'}
            loading={this.state.loading}
          /> 
          <p>Generando reportes</p>
        </div>
        :    
        <div>
      
        <div>
          <select id="movies" className="select" onChange={mes => this.setState({monthSelected: mes})}>
              <option>
                Mes actual
              </option>
              {months.map((item, index) => {
                return (
                  <option key={item.key} value={item.key}>
                    {item.mes}
                  </option>
                );
              })}
          </select>


          <select id="movies" className="select" onChange={this.fetchData.bind(this)}>
              <option>
                Año actual
              </option>
              {years.map((item, index) => {
                return (
                  <option key={index} value={item}>
                    {item}
                  </option>
                );
              })}
          </select>
        </div>

        <p className = "title" id = "stats">Estadisticas mensuales</p>

        <div className ="card ">
          <Table
            headerClassName ="table-header"
            hoverable
            sortable
            rowKey={record => record.id}
            columns={columns}
            data={data}
          />
        </div>

        <div className ="card">
          <div className ="center">
            <ChartPrediction dataIngresos = {this.state.ingresosbyMonth} dataEgresos = {this.state.egresosByMonth}/>
          </div>
        </div>

        <p> Ventas netas </p>

        <div className ="card">
          <ChartTotals totalEgresos = {this.state.totalEgresos} totalIngresos = {this.state.totalIngresos} month = {1}/>
        </div>

        <p className = "title" id = "kpis">Kpi´s Financieros</p>

        <div className ="card">
          <p className ="cardTitle">Utilidad neta</p>
          <CountUp className ="number"
            decimals = {2}
            prefix = "$ "
            separator=","
            end={utilidadNeta}
          />
        </div>

        <div className ="card">
          <p className ="cardTitle">Retorno de inversión</p>
          <CountUp className ="number"
            decimals = {2}
            prefix = "% "
            separator=","
            end={roi}
          />
        </div>


        <div className ="card">
          <p className ="cardTitle">Tasa de crecimiento</p>
          <CountUp className ="number"
            decimals = {2}
            prefix = "% "
            separator=","
            end={22.5}
          />
        </div>


        <div className ="card">
          <p className ="cardTitle">Punto equilibrio (dias)</p>
          <CountUp className ="number"
            decimals = {2}
            prefix = "# "
            separator=","
            end={puntoEquilibrio}
          />
        </div>

        <div className ="card">
          <p className ="cardTitle">Costo de financiación</p>
          <CountUp className ="number"
            decimals = {2}
            prefix = "$ "
            separator=","
            end={84560.51}
          />
        </div>

        <p className = "title" id= "clients">Clientes</p>


            <div className ="card">
               <div className = "user-info border-line">
                  <p className = "one"> CLIENTES</p>
                  <p className = "two"> INGRESO</p>
                  <p className = "three">ADEUDO MES</p>
                  <p className = "four">ADEUDO ANTERIOR</p>
               </div>
              {this.adeudos()}
            </div>

            <div className ="card">
                <div className ="center">
                  <ChartProduct title = "Desgloce Culiacan" egreso = {this.state.egresoCLN }/>
                </div>
                <div className ="center">
                  <ChartProduct title = "Desgloce Mochis" egreso = {this.state.egresoMochis }/>
                </div>
                <div className ="center">
                  <ChartProduct title = "Desgloce Queretaro" egreso = { this.state.egresoQro }/>
                </div>
            </div>


        <div className ="card ">
          <StackedChart oxxo = {this.state.grupoOxxo} bonatti = {this.state.grupoBonnati} mochis = {this.state.grupoMochis} gastosOxxo = {this.state.gastosOxxo} gastosBonatti= {this.state.gastosBonatti} gastosTiendas = {this.state.gastosTiendas} totalTiendas = {this.state.totalTiendas}/>
        </div>


        <p>Utilidad y perdida por recolección</p>
        <div className ="card ">
              <div className ="center">
                <ChartPositions payByClient = {this.state.byGroup}/>
              </div>
        </div>


       <p className = "title" id= "bus">Recolección del mes</p>
  
        <div className ="card ">
          <div className ="flex-r">
            <Table
              headerClassName ="table-header"
              hoverable
              sortable
              rowKey={record => record.id}
              columns={columnRecolección}
              data={dataRecolección}
            />

            <Table
              headerClassName ="table-header"
              hoverable
              sortable
              rowKey={record => record.id}
              columns={columnIndicadores}
              data={dataIndicadores}
            />
          </div>
        </div>

        <div className = "card">
          <Calendar/>
        </div>
      </div>
      }

    </div>

    );
  }
}

export default Stats;
