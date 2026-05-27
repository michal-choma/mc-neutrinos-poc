// _neu_generated_code__dont_modify_directly_
let instance = null;
//CORE_REFERENCE_IMPORTS
//append_imports_start

import cookieParser from 'cookie-parser'; //_splitter_
import { dirname } from 'path'; //_splitter_
import { fileURLToPath } from 'url'; //_splitter_
import { SDBaseService } from '../services/SDBaseService'; //_splitter_
import { TracerService } from '../services/TracerService'; //_splitter_
import log from '../utils/Logger'; //_splitter_
import { GenericRDBMSOperations } from '../utils/ndefault-sql/ExecuteSql/GenericRDBMSOperations'; //_splitter_
//append_imports_end
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export class getAccident {
  private sdService = new SDBaseService();
  private tracerService = new TracerService();
  private app;
  private serviceBasePath: string;
  private generatedMiddlewares: Object;
  private serviceName: string;

  private globalTimers: any;
  private constructor(
    app,
    generatedeMiddlewares,
    routeCall,
    middlewareCall,
    globalTimers
  ) {
    this.serviceName = 'getAccident';
    this.app = app;
    this.serviceBasePath = this.app.settings.base;
    this.generatedMiddlewares = generatedeMiddlewares;
    this.globalTimers = globalTimers;
  }

  static getInstance(
    app?,
    generatedeMiddlewares?,
    routeCall?,
    middlewareCall?,
    globalTimers?
  ) {
    if (!instance) {
      instance = new getAccident(
        app,
        generatedeMiddlewares,
        routeCall,
        middlewareCall,
        globalTimers
      );
    }
    instance.mountCalls(routeCall, middlewareCall);
    return instance;
  }

  private mountCalls(routeCall, middlewareCall) {
    if (routeCall) {
      this.mountAllPaths();
      this.mountAllListeners();
    }
    if (middlewareCall) {
      this.generatedMiddlewares[this.serviceName] = {};
      this.mountAllMiddlewares();
      this.mountTimers();
    }
  }

  async mountAllListeners() {
    //append_listeners
  }

  async mountTimers() {
    //appendnew_flow_getAccident_TimerStart
  }

  private mountAllMiddlewares() {
    log.debug('mounting all middlewares for service :: getAccident');
    //appendnew_flow_getAccident_MiddlewareStart
  }

  private mountAllPaths() {
    log.debug('mounting all paths for service :: getAccident');

    this.app['get'](
      `${this.serviceBasePath}/accident`,
      cookieParser(),
      this.sdService.getMiddlesWaresBySequenceId(
        null,
        'pre',
        this.generatedMiddlewares
      ),

      async (req, res, next) => {
        let bh: any = {};
        try {
          bh = this.sdService.__constructDefault(
            { local: {}, input: {} },
            req,
            res,
            next
          );
          let parentSpanInst = null;
          bh = await this.getAccidentScript(bh, parentSpanInst);
          //appendnew_next_sd_aJPx0iW175V5m6vH
        } catch (e) {
          return await this.errorHandler(bh, e, 'sd_aJPx0iW175V5m6vH');
        }
      },
      this.sdService.getMiddlesWaresBySequenceId(
        null,
        'post',
        this.generatedMiddlewares
      )
    );
    //appendnew_flow_getAccident_HttpIn
  }
  //   service flows_getAccident

  //appendnew_flow_getAccident_start

  async getAccidentScript(bh, parentSpanInst) {
    const spanInst = this.tracerService.createSpan(
      'getAccidentScript',
      parentSpanInst
    );
    try {
      bh.local.caseNumber = bh.input.query.case_number;
      bh.local.accidentQuery = `
    SELECT a.case_number, a.location, a.city, a.call_date,
           p.party_order, p.name, p.car_make, p.car_model,
           p.car_mfg_year, p.plate_no, p.liability_pct,
           p.recovery, p.policy_number, p.insurance_company
    FROM accidents a
    JOIN parties p ON p.accident_id = a.id
    WHERE a.case_number = '${bh.local.caseNumber}'
    ORDER BY p.party_order
  `;
      this.tracerService.sendData(spanInst, bh);
      bh = await this.getAccidentSql(bh, parentSpanInst);
      //appendnew_next_getAccidentScript
      return bh;
    } catch (e) {
      return await this.errorHandler(
        bh,
        e,
        'sd_uW3LNpWtUNc2pAKj',
        spanInst,
        'getAccidentScript'
      );
    }
  }

  async getAccidentSql(bh, parentSpanInst) {
    const spanInst = this.tracerService.createSpan(
      'getAccidentSql',
      parentSpanInst
    );
    try {
      let configObj = this.sdService.getConfigObj(
        'db-config',
        'sd_NXdLAOeMJCyRLjWN'
      );
      let connectionName;
      if (
        configObj &&
        configObj.hasOwnProperty('dbOption') &&
        configObj.dbOption.hasOwnProperty('name')
      ) {
        connectionName = configObj.dbOption.name;
      } else {
        throw new Error('Cannot find the selected config name');
      }
      let params = [];
      params = params ? params : [];
      bh.local.rawResult = await new GenericRDBMSOperations().executeSQL(
        connectionName,
        bh.local.accidentQuery,
        params
      );
      this.tracerService.sendData(spanInst, bh);
      bh = await this.mapResult(bh, parentSpanInst);
      //appendnew_next_getAccidentSql
      return bh;
    } catch (e) {
      return await this.errorHandler(
        bh,
        e,
        'sd_zfzx3E2iLk3DjhdR',
        spanInst,
        'getAccidentSql'
      );
    }
  }

  async mapResult(bh, parentSpanInst) {
    const spanInst = this.tracerService.createSpan('mapResult', parentSpanInst);
    try {
      const rows = bh.local.rawResult;
      const first = rows[0];

      bh.local.response = {
        case_number: first.case_number,
        location: first.location,
        city: first.city,
        call_date: first.call_date,
        parties: rows.map((r) => ({
          party_order: r.party_order,
          name: r.name,
          car_make: r.car_make,
          car_model: r.car_model,
          car_mfg_year: r.car_mfg_year,
          plate_no: r.plate_no,
          liability_pct: r.liability_pct,
          recovery: r.recovery,
          policy_number: r.policy_number,
          insurance_company: r.insurance_company,
        })),
      };
      this.tracerService.sendData(spanInst, bh);
      await this.accidentResult(bh, parentSpanInst);
      //appendnew_next_mapResult
      return bh;
    } catch (e) {
      return await this.errorHandler(
        bh,
        e,
        'sd_2Vr77k3WVKgVLJUB',
        spanInst,
        'mapResult'
      );
    }
  }

  async accidentResult(bh, parentSpanInst) {
    try {
      bh.web.res.status(200).send(bh.local.response);

      return bh;
    } catch (e) {
      return await this.errorHandler(bh, e, 'sd_TcNKihyuVGeNBzUb');
    }
  }

  //appendnew_node

  // error_handler_slot
  private async errorHandler(
    bh,
    e,
    src,
    parentSpanInst?,
    functionName?
  ): Promise<any> {
    console.error(e);
    bh.error = e;
    bh.errorSource = src;
    bh.errorFunName = functionName;
    this.tracerService.sendData(parentSpanInst, bh, true);
    if (bh.web.next) {
      bh.web.next(e);
    } else {
      throw e;
    }
  }
  //appendnew_flow_getAccident_Catch
}
