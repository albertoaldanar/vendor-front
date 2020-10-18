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
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Button from 'react-bootstrap/Button';

class Stats extends Component{

  constructor(props){
    super(props);
    this.state = {
        ingresosbyMonth: [], egresosByMonth: [], totalEgresos: 0, totalIngresos: 0, month: "",
        egresoQro: [[]], egresoCLN: [[]], egresoMochis: [[]], stopsByClient:[], payByClient: [],
        totalRec: 0, totalRecFail: 0, descargas: 0, incidentes: 0, year: 0, byGroup: [], ingersos: [], loading: true,
        monthSelected: new Date().getMonth() + 1 , yearSelected: new Date().getFullYear(), clientesGanados: null, clientesPerdidos: null, egresos: [], allStops: [], paradasCount: [], arrayIngresosMesPasado: 0
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
    return this.getData()
  }

  filterData(){
    this.setState({loading: true});
    return this.getData()
  }

  dataMonth(event){
    this.setState({monthSelected: Number(event.target.value)});
  }

  dataYear(event){
    this.setState({yearSelected: Number(event.target.value)});
  }

  getData(){
    setTimeout(() => {this.setState({loading: false})}, 7500);

    const db = firebase.firestore();
    // Clientes ganados y perdidos
    const clientesGanados = [];
    let cGanados = db.collection('clientesGanados').where('año', '==', this.state.yearSelected).where("mes", "==", this.state.monthSelected).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          clientesGanados.push(doc.data());
        })
      });
      this.setState({clientesGanados});

    const clientesPerdidos = [];
    let cPerdidos = db.collection('clientesPerdidos').where('año', '==', this.state.yearSelected).where("mes", "==", this.state.monthSelected).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          clientesPerdidos.push(doc.data());
        })
      });
      this.setState({clientesPerdidos});

    //Total ingrso por mes
    const arrayI = []
    let ingRef = db.collection('Ingresos').where('año', '==', this.state.yearSelected).orderBy("mes").get()
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

    const arrayE = []
    let egreRef = db.collection('egreso').where('año', '==', this.state.yearSelected).orderBy("mes").get()
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
    const arrayIngresos = [];
    const arrayDesglosado = [];
    let ingresosRef = db.collection('Ingresos').where('mes', '==', this.state.monthSelected).where('año', '==', this.state.yearSelected).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
          arrayIngresos.push(doc.data().importe);
          arrayDesglosado.push(doc.data());

          this.setState({totalIngresos: arrayIngresos.reduce((a, b) => a + b, 0)})
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });

    this.setState({ingresos: arrayDesglosado});


    //TOTAL INGRESO MES PASADO
    const arrayIngresosMesPasado = [];
    let ingresosMPRef = db.collection('Ingresos').where('mes', '==', this.state.monthSelected - 1 ).where('año', '==', this.state.yearSelected).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
          arrayIngresosMesPasado.push(doc.data().importe);

          this.setState({arrayIngresosMesPasado: arrayIngresosMesPasado.reduce((a, b) => a + b, 0)});

        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });


    //TOTAL EGRESO
    const arrayEgresos = [];
    const egresos= [];
    let egresosRef = db.collection('egreso').where('mes', '==', this.state.monthSelected).where('año', '==', this.state.yearSelected).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
          arrayEgresos.push(doc.data().importe);
          egresos.push(doc.data());

          this.setState({totalEgresos: arrayEgresos.reduce((a, b) => a + b, 0), egresos })
        });
      })

      // Ingreso por recolección
      const porRe = []
      let porRecoleccion = db.collection('Ingresos').where('mes', '==', this.state.monthSelected).where('año', '==', this.state.yearSelected).get()
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
      const egQro = [];
      let egresosQro = db.collection('egreso').where('mes', '==', this.state.monthSelected).where('año', '==', this.state.yearSelected).where("lugar", "==", "QUERETARO").get()
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
      let egresosMochis = db.collection('egreso').where('mes', '==', this.state.monthSelected).where('año', '==', this.state.yearSelected).where("lugar", "==", "MOCHIS").get()
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
      let egresosCuliacan = db.collection('egreso').where('mes', '==', this.state.monthSelected).where('año', '==', this.state.yearSelected).where("lugar", "==", "CULIACAN").get()
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

    // PARADAS
    const par = [];
    let parad = db.collection('parada').where('año', '==', this.state.yearSelected).where("mes", "==", this.state.monthSelected).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          par.push(doc.data());
          this.setState({allStops: par});

          // let counts = par.reduce((prev, curr) => {
          //       let count = prev.get(curr.mes) || 0;
          //       prev.set(curr.mes, curr.length);
          //       return prev;
          //     }, new Map());

          //     // then, map your counts object back to an array
          //     let reducedObjArr = [...counts].map(([key, value]) => {
          //       return {key, value}
          //     })
          //     this.setState({paradasCount: reducedObjArr});

          var counts = {};
          par.forEach(x => {
            counts[x.client] = (counts[x.client] || 0) + 1 ;
          });

          this.setState({paradasCount: counts})
        });
      })

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


  statsBlock(){
    var access = localStorage.getItem('access');

    const {incidentes, descargas, totalRec, totalRecFail, totalIngresos, totalEgresos, ingresos, allStops, paradasCount, arrayIngresosMesPasado} = this.state;
    console.log(this.state.totalIngresos, this.state.totalEgresos);


    const utilidadNeta = totalIngresos - totalEgresos || 0;
    const roi = (totalIngresos / totalEgresos) || 0;

    const TDC = ((totalIngresos - arrayIngresosMesPasado) / arrayIngresosMesPasado) * 100 || 0;

    const puntoEquilibrio = (totalEgresos / (totalIngresos / 30)) || 0;

    const months = [ {mes: "Enero", key: 1}, {mes: "Febrero", key: 2}, {mes: "Marzo", key: 3}, {mes: "Abril", key: 4}, {mes: "Mayo", key: 5}, {mes: "Junio", key: 6}, {mes: "Julio", key: 7}, {mes: "Agosto", key: 8}, {mes: "Septiembre", key: 9}, {mes: "Octubre", key: 10}, {mes: "Noviembre", key: 11}, {mes: "Diciembre", key: 12}];
    const monthStrings = { 1: "Enero", 2: "Febrero", 3: "Marzo", 4: "Abril", 5: "Mayo", 6: "Junio", 7: "Julio", 8: "Agosto", 9: "Septiembre", 10: "Octubre", 11: "Noviembre", 12: "Diciembre" }
    const years = [2019, 2020];

    const columns = [
        { dataIndex: 'clientesGanados', title: "Clientes Ganados" },
    ];

    const columnsPerdidos = [
        { dataIndex: 'clientesPerdidos', title: "Clientes Perdidos" },
    ];

    const data = this.state.clientesGanados.map((x, index) => {
        return { id: index, clientesGanados: x.cliente}
    });

    const dataPerdidos = this.state.clientesPerdidos.map((x, index) => {
        return { id: index, clientesPerdidos: x.cliente}
    });

    const calendarStops = allStops.filter(x => x.client == "BASURA" || x.client == "INCIDENTE" || x.client == "GASOLINA");
    console.log(calendarStops);

    const bonattiIngresos = ingresos.filter(x => x.cliente == "BONATTI").map(x => x.importe).reduce((a, b) => a + b, 0);
    const oxxoIngresos = ingresos.filter(x => x.cliente == "OXXO").map(x => x.importe).reduce((a, b) => a + b, 0);
    const otrosIngresos = ingresos.filter(x => x.cliente != "BONATTI" && x.cliente!= "OXXO").map(x => x.importe).reduce((a, b) => a + b, 0);


    const bonattiEgresos = allStops.filter(x => x.client == "BONATTI").length * 120;
    const oxxoEgresos = allStops.filter(x => x.client == "OXXO").length * 120;
    const otrosEgresos = allStops.filter(x => x.client != "BONATTI" && x.cliente!= "OXXO" && x.cliente!= "BASURA" && x.cliente!= "GASOLINA").length * 120;

    console.log(bonattiEgresos, oxxoEgresos, otrosEgresos);

    const columnRecolección = [
        { dataIndex: 'cliente', title: "Clientes" },
        { dataIndex: 'diasRecolección', title: 'Días de recolección' },
    ];

    const dataRecolección =[

    ]

    for (var key in paradasCount) {
      if (paradasCount.hasOwnProperty(key)) {
        console.log(key + " -> " + paradasCount[key]);
        dataRecolección.push({cliente: key, diasRecolección: paradasCount[key]});
      }
    }

    const columnIndicadores = [
        { dataIndex: 'indicadores', title: "Indicadores" },
        { dataIndex: 'number', title: '#' }
    ];

    const dataIndicadores = [
            { id: 1, indicadores: 'Incidentes', number: this.state.allStops.filter(x => x.client == "INCIDENTE" ).length },
            { id: 2, indicadores: 'Recolecciones totales', number: this.state.allStops.length },
            { id: 3, indicadores: "Recolecciones fallidas", number: this.state.allStops.filter(x => x.fallida == true).length },
            { id: 4, indicadores: 'Descargas', number: this.state.allStops.filter(x => x.client == "BASURA").length },
    ];


    if(access == "Conductor" || access == "Admin Archivo"){
      return(
        <div>
                <img  width ="70" height = "70" src ="https://image.flaticon.com/icons/svg/395/395848.svg"/>
                <p className ="blocked">Esta función es solo para Administradores con total acceso !</p>
              </div>
            );
          } else {
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
                <select id="months" className="select" onChange={this.dataMonth.bind(this)}>
                  value={this.state.monthSelected}
                    {months.map((item, index) => {
                      return (
                        <option key={item.key} value={item.key}>
                          {item.mes}
                        </option>
                      );
                    })}
                </select>

                <select id="years" className="select" onChange={this.dataYear.bind(this)}>
                  value={this.state.yearSelected}
                    {years.map((item, index) => {
                      return (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      );
                    })}
                </select>

                <button className="primary" onClick= {this.filterData.bind(this)}>Filtrar data</button>
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
                  <Table
                    headerClassName ="table-header"
                    hoverable
                    sortable
                    rowKey={record => record.id}
                    columns={columnsPerdidos}
                    data={dataPerdidos}
                  />
              </div>

              <div className ="card">
                <div className ="center">
                  <ChartPrediction dataIngresos = {this.state.ingresosbyMonth} dataEgresos = {this.state.egresosByMonth}/>
                </div>
              </div>

              <p> Ventas netas </p>

              <div className ="card">
                <ChartTotals totalEgresos = {this.state.totalEgresos} totalIngresos = {this.state.totalIngresos} month = {this.state.monthSelected}/>
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
                  end={TDC}
                />
              </div>


              <div className ="card">
                <p className ="cardTitle">Punto equilibrio (dias)</p>
                <CountUp className ="number"
                  decimals = {0}
                  prefix = "días "
                  separator=""
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
                <StackedChart oxxo = {oxxoIngresos} bonatti = {bonattiIngresos} otros = {otrosIngresos} gastosOxxo = {oxxoEgresos} gastosBonatti= {bonattiEgresos} gastosOtros = {otrosEgresos}/>
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
                <Calendar stops = {calendarStops}/>
              </div>
            </div>
            }

          </div>

        );
    }
  }

  onChange(item){
    this.setState({userSelected: item})
  }

  render(){
    console.log(this.state.arrayIngresosMesPasado);

    return(
      <div>
        {this.statsBlock()}

        <Link to="/privacyPolitics">
            <span>Politicas de privacidad</span>
        </Link>
      </div>
    );

  }
}

export default Stats;
